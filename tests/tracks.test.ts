import test from 'node:test';
import assert from 'node:assert/strict';
import { catalog } from '../src/data/catalog.ts';
import { tracks } from '../src/data/tracks.ts';

test('every topic belongs to exactly one browsing group', () => {
  for (const topic of catalog.topics) {
    assert.equal(tracks.filter((track) => (track.stageIds as readonly string[]).includes(topic.stageId)).length, 1, topic.id);
  }
  for (const track of tracks) {
    for (const id of track.stageIds) assert.ok(catalog.stages.some((stage) => stage.id === id));
  }
});
