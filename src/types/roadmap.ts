
export type RoadmapNode = {
  id: string;
  title: string;
  category: string;
  description: string;
  prerequisites: string[];
  resources: string[];
  isOptional: boolean;
};
