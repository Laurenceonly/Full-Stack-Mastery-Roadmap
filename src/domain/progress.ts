import type { RoadmapTopic } from '../types/roadmap.ts';

// Required topics form the primary denominator; optional progress stays separate.
export function summarizeProgress(topics: readonly RoadmapTopic[], progress: Readonly<Record<string, boolean>>) {
  const summary = { required: { completed: 0, total: 0 }, optional: { completed: 0, total: 0 } };
  for (const topic of topics) {
    const group = topic.optional ? summary.optional : summary.required;
    group.total += 1;
    if (progress[topic.id] === true) group.completed += 1;
  }
  return summary;
}
