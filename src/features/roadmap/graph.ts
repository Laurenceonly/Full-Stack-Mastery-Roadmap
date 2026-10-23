import type { RoadmapCatalog } from '../../types/roadmap.ts';

// Input is the validated catalog. Prerequisites always sit above dependents.
export function getRoadmapPositions(catalog: RoadmapCatalog): Record<string, { x: number; y: number }> {
  const topics = new Map(catalog.topics.map((topic) => [topic.id, topic]));
  const depths = new Map<string, number>();
  function depth(id: string): number {
    if (depths.has(id)) return depths.get(id)!;
    const dependencies = topics.get(id)!.prerequisiteIds;
    const result = dependencies.length ? Math.max(...dependencies.map(depth)) + 1 : 0;
    depths.set(id, result);
    return result;
  }
  const rows = new Map<number, string[]>();
  for (const topic of catalog.topics) {
    const row = depth(topic.id);
    rows.set(row, [...(rows.get(row) ?? []), topic.id]);
  }
  const positions: Record<string, { x: number; y: number }> = {};
  for (const [row, ids] of rows) {
    ids.forEach((id, index) => {
      positions[id] = { x: (index - (ids.length - 1) / 2) * 280, y: row * 150 };
    });
  }
  return positions;
}
