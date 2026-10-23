
export type LearningStatus = 'not-started' | 'learning' | 'practicing' | 'completed';
export type ResourceKind = 'docs' | 'course' | 'video' | 'article' | 'exercise';
export type CertificateStatus = 'none' | 'free' | 'paid' | 'unknown';

export interface RoadmapStage {
  id: string;
  title: string;
  order: number;
}

export interface LearningResource {
  id: string;
  title: string;
  provider: string;
  url: string;
  kind: ResourceKind;
  freeToAccess: boolean | null;
  certificateStatus: CertificateStatus;
  verifiedAt?: string;
  verificationUrl?: string;
  certificateRequirements?: string;
}

export interface RoadmapTopic {
  id: string;
  title: string;
  stageId: string;
  category: string;
  summary: string;
  objectives: string[];
  prerequisiteIds: string[];
  optional: boolean;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  practiceTasks: string[];
  acceptanceCriteria: string[];
  resourceIds: string[];
  estimatedHours?: { min: number; max: number };
}

export interface RoadmapCatalog {
  stages: readonly RoadmapStage[];
  topics: readonly RoadmapTopic[];
  resources: readonly LearningResource[];
}

// Compatibility contract for the V1 UI. Canonical content lives in the catalog.
export type RoadmapNode = {
  id: string;
  title: string;
  category: string;
  description: string;
  prerequisites: string[];
  resources: string[];
  isOptional: boolean;
};
