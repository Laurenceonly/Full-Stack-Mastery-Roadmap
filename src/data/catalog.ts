import type { RoadmapCatalog } from '../types/roadmap.ts';
import { assertValidCatalog } from '../lib/catalog-validation.ts';
import { stages } from './stages.ts';
import { topics } from './topics/index.ts';
import { resources } from './resources/index.ts';

export const catalog: RoadmapCatalog = { stages, topics, resources };
assertValidCatalog(catalog);
