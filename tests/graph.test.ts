import test from 'node:test';
import assert from 'node:assert/strict';
import { catalog } from '../src/data/catalog.ts';
import { getRoadmapPositions } from '../src/features/roadmap/graph.ts';

test('every topic has a unique deterministic position below its prerequisites', () => {
  const positions = getRoadmapPositions(catalog);
  assert.deepEqual(getRoadmapPositions(catalog), positions);
  assert.equal(Object.keys(positions).length, catalog.topics.length);
  assert.equal(new Set(Object.values(positions).map(({ x, y }) => `${x},${y}`)).size, catalog.topics.length);
  for (const topic of catalog.topics) {
    for (const dependency of topic.prerequisiteIds) assert.ok(positions[dependency].y < positions[topic.id].y);
  }
});

test('HTML, CSS, and JavaScript lead to TypeScript; Tailwind is optional after CSS', () => {
  const topics = new Map(catalog.topics.map((topic) => [topic.id, topic]));
  assert.deepEqual(topics.get('css')!.prerequisiteIds, ['html']);
  assert.deepEqual(topics.get('javascript')!.prerequisiteIds, ['html', 'css']);
  assert.deepEqual(topics.get('typescript')!.prerequisiteIds, ['javascript']);
  assert.deepEqual(topics.get('tailwind')!.prerequisiteIds, ['css']);
  assert.equal(topics.get('tailwind')!.optional, true);
});
