import test from 'node:test';
import assert from 'node:assert/strict';
import { catalog } from '../src/data/catalog.ts';
import { summarizeProgress } from '../src/domain/progress.ts';

test('counts required and optional completions separately, ignoring obsolete IDs', () => {
  const topics = structuredClone(catalog.topics);
  topics[0].optional = true;
  const progress = { planning: true, typescript: true, frontend: false, removed: true };
  const before = structuredClone(progress);
  const expected = { required: { completed: 1, total: 11 }, optional: { completed: 1, total: 2 } };
  assert.deepEqual(summarizeProgress(topics, progress), expected);
  assert.deepEqual(summarizeProgress(topics, progress), expected);
  assert.deepEqual(progress, before);
});

test('missing completions default to zero and empty catalogs have zero totals', () => {
  assert.deepEqual(summarizeProgress(catalog.topics, {}), {
    required: { completed: 0, total: 12 }, optional: { completed: 0, total: 1 },
  });
  assert.deepEqual(summarizeProgress([], { removed: true }), {
    required: { completed: 0, total: 0 }, optional: { completed: 0, total: 0 },
  });
});
