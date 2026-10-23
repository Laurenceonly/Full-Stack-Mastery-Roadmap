
import { useEffect, useState } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  MarkerType,
  type Node,
  type Edge,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import './App.css'

import { roadmap } from './data/roadmap';

type Progress = Record<string, boolean>;

const positions: Record<string, { x: number; y: number }> = {
  planning: { x: 380, y: 0 },
  typescript: { x: 380, y: 140 },
  frontend: { x: 120, y: 300 },
  backend: { x: 640, y: 300 },
  database: { x: 640, y: 460 },
  integration: { x: 380, y: 620 },
  mobile: { x: 120, y: 800 },
  testing: { x: 640, y: 800 },
  devops: { x: 380, y: 980 },
};

const nodes: Node[] = roadmap.map((item) => ({
  id: item.id,
  position: positions[item.id],
  data: { label: item.title },
  style: {
    background: '#18181b',
    color: '#fafafa',
    border: '1px solid #52525b',
    borderRadius: 12,
    padding: 16,
    width: 210,
    textAlign: 'center',
    fontWeight: 600,
  },
}));

const edges: Edge[] = roadmap.flatMap((item) =>
  item.prerequisites.map((dependency) => ({
    id: `${dependency}-${item.id}`,
    source: dependency,
    target: item.id,
    type: 'smoothstep',
    markerEnd: { type: MarkerType.ArrowClosed },
    style: { stroke: '#71717a', strokeWidth: 2 },
  }))
);

function loadProgress(): Progress {
  try {
    return JSON.parse(
      localStorage.getItem('roadmap-progress') ?? '{}'
    ) as Progress;
  } catch {
    return {};
  }
}

export default function App() {
  const [selected, setSelected] = useState<string | null>(null);
  const [progress, setProgress] = useState<Progress>(loadProgress);

  useEffect(() => {
    localStorage.setItem('roadmap-progress', JSON.stringify(progress));
  }, [progress]);

  const topic = roadmap.find((item) => item.id === selected);
  const completed = roadmap.filter((item) => progress[item.id]).length;

  return (
    <div className="flex h-screen flex-col bg-zinc-950 text-white">
      <header className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-800 p-5">
        <div>
          <h1 className="text-xl font-bold">Full-Stack Mastery</h1>
          <p className="text-sm text-zinc-400">
            TypeScript PERN · Web · Mobile · DevOps
          </p>
        </div>
        <div className="text-sm text-zinc-300">
          Progress: {completed}/{roadmap.length}
        </div>
      </header>

      <div className="flex min-h-0 flex-1 flex-col md:flex-row">
        <main className="min-h-[55vh] flex-1">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            nodesDraggable={false}
            nodesConnectable={false}
            onNodeClick={(_, node) => setSelected(node.id)}
            fitView
            fitViewOptions={{ padding: 0.2 }}
            colorMode="dark"
          >
            <Background />
            <Controls />
          </ReactFlow>
        </main>

        <aside className="w-full overflow-y-auto border-t border-zinc-800 bg-zinc-900 p-6 md:w-96 md:border-l md:border-t-0">
          {topic ? (
            <div className="space-y-5">
              <div>
                <p className="text-sm text-blue-400">
                  {topic.category}
                </p>
                <h2 className="mt-1 text-2xl font-bold">
                  {topic.title}
                </h2>
              </div>

              <p className="text-zinc-300">{topic.description}</p>

              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={Boolean(progress[topic.id])}
                  onChange={(event) =>
                    setProgress((previous) => ({
                      ...previous,
                      [topic.id]: event.target.checked,
                    }))
                  }
                />
                Mark as completed
              </label>

              <div>
                <h3 className="mb-2 font-semibold">Prerequisites</h3>
                {topic.prerequisites.length ? (
                  <ul className="list-inside list-disc text-zinc-400">
                    {topic.prerequisites.map((id) => (
                      <li key={id}>
                        {roadmap.find((item) => item.id === id)?.title}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-zinc-400">
                    No prerequisites
                  </p>
                )}
              </div>

              <div>
                <h3 className="mb-2 font-semibold">
                  Learning resources
                </h3>
                <ul className="space-y-2">
                  {topic.resources.map((url) => (
                    <li key={url}>
                      <a
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="break-all text-sm text-blue-400 underline"
                      >
                        {new URL(url).hostname}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <h2 className="text-xl font-bold">
                Your Learning Roadmap
              </h2>
              <p className="text-zinc-400">
                Select a technology node to explore its description,
                prerequisites, learning resources, and progress.
              </p>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
