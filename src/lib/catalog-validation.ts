import type { RoadmapCatalog } from '../types/roadmap.ts';

export function validateCatalog(catalog: RoadmapCatalog): string[] {
  const errors: string[] = [];
  for (const [kind, entries] of [
    ['stage', catalog.stages], ['topic', catalog.topics], ['resource', catalog.resources],
  ] as const) {
    const seen = new Set<string>();
    for (const entry of entries) {
      if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(entry.id)) errors.push(`Invalid ${kind} ID: ${entry.id}`);
      if (seen.has(entry.id)) errors.push(`Duplicate ${kind} ID: ${entry.id}`);
      seen.add(entry.id);
      if (!entry.title.trim()) errors.push(`Missing title for ${kind}: ${entry.id}`);
    }
  }
  const stages = new Set(catalog.stages.map((stage) => stage.id));
  const resources = new Set(catalog.resources.map((resource) => resource.id));
  const topics = new Map(catalog.topics.map((topic) => [topic.id, topic]));
  for (const topic of catalog.topics) {
    if (!stages.has(topic.stageId)) errors.push(`Unknown stage ${topic.stageId} for ${topic.id}`);
    if (!topic.summary.trim() || !topic.category.trim()) errors.push(`Missing description/category for ${topic.id}`);
    for (const field of ['objectives', 'practiceTasks', 'acceptanceCriteria', 'resourceIds'] as const) {
      if (!topic[field].length || topic[field].some((value) => !value.trim())) errors.push(`Missing ${field} for ${topic.id}`);
    }
    for (const id of topic.resourceIds) {
      if (!resources.has(id)) errors.push(`Unknown resource ${id} for ${topic.id}`);
    }
    for (const id of topic.prerequisiteIds) {
      if (id === topic.id) errors.push(`Self-dependency: ${topic.id}`);
      if (!topics.has(id)) errors.push(`Unknown prerequisite ${id} for ${topic.id}`);
    }
    if (new Set(topic.prerequisiteIds).size !== topic.prerequisiteIds.length) errors.push(`Duplicate prerequisite for ${topic.id}`);
    const hours = topic.estimatedHours;
    if (hours && (!Number.isFinite(hours.min) || !Number.isFinite(hours.max) || hours.min < 0 || hours.max < hours.min)) {
      errors.push(`Invalid estimated hours for ${topic.id}`);
    }
  }
  for (const resource of catalog.resources) {
    try {
      const url = new URL(resource.url);
      if (!['http:', 'https:'].includes(url.protocol)) throw new Error('Unsafe protocol');
    } catch {
      errors.push(`Invalid resource URL: ${resource.id}`);
    }
    if (!resource.provider.trim()) errors.push(`Missing provider for ${resource.id}`);
    const date = resource.verifiedAt;
    if (date && (!/^\d{4}-\d{2}-\d{2}$/.test(date) || !Number.isFinite(Date.parse(date)) || new Date(date).toISOString().slice(0, 10) !== date)) {
      errors.push(`Invalid verification date: ${resource.id}`);
    }
    if ((resource.freeToAccess !== null || resource.certificateStatus !== 'unknown') && !date) {
      errors.push(`Verification date required for resource claims: ${resource.id}`);
    }
    if (resource.certificateStatus === 'free' && (!resource.verificationUrl || !resource.certificateRequirements?.trim())) {
      errors.push(`Verification source and requirements required for free certificate: ${resource.id}`);
    }
    if (resource.verificationUrl) {
      try {
        if (new URL(resource.verificationUrl).protocol !== 'https:') throw new Error('Unsafe source');
      } catch { errors.push(`Invalid verification source URL: ${resource.id}`); }
    }
  }
  const visiting = new Set<string>();
  const visited = new Set<string>();
  function visit(id: string, path: string[]) {
    if (visiting.has(id)) {
      errors.push(`Circular dependency: ${[...path, id].join(' -> ')}`);
      return;
    }
    if (visited.has(id) || !topics.has(id)) return;
    visiting.add(id);
    for (const dependency of topics.get(id)!.prerequisiteIds) visit(dependency, [...path, id]);
    visiting.delete(id);
    visited.add(id);
  }
  for (const id of topics.keys()) visit(id, []);
  return errors;
}

export function assertValidCatalog(catalog: RoadmapCatalog): void {
  const errors = validateCatalog(catalog);
  if (errors.length) throw new Error(`Invalid roadmap catalog:\n${errors.join('\n')}`);
}
