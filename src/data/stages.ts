import type { RoadmapStage } from '../types/roadmap.ts';

export const stages: RoadmapStage[] = [
  { id: 'workflow', title: 'Engineering workflow', order: 0 },
  { id: 'web', title: 'Web foundations', order: 1 },
  { id: 'language', title: 'TypeScript foundations', order: 2 },
  { id: 'frontend', title: 'Frontend engineering', order: 3 },
  { id: 'backend', title: 'Backend engineering', order: 4 },
  { id: 'data', title: 'Data and persistence', order: 5 },
  { id: 'integration', title: 'Full-stack integration', order: 6 },
  { id: 'quality', title: 'Testing and quality', order: 7 },
  { id: 'mobile', title: 'Mobile engineering', order: 8 },
  { id: 'delivery', title: 'Delivery and operations', order: 9 },
  { id: 'mastery', title: 'Professional mastery', order: 10 },
];
