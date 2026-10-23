import type { RoadmapNode } from '../types/roadmap.ts';
import { catalog } from './catalog.ts';

const resourcesById = new Map(catalog.resources.map((resource) => [resource.id, resource]));

// Adapt canonical data to the existing graph and sidebar during V2 migration.
export const roadmap: RoadmapNode[] = catalog.topics.map((topic) => ({
  id: topic.id,
  title: topic.title,
  category: topic.category,
  description: topic.summary,
  prerequisites: topic.prerequisiteIds,
  resources: topic.resourceIds.map((id) => resourcesById.get(id)!.url),
  isOptional: topic.optional,
}));
