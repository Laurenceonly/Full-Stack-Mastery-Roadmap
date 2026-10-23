import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { catalog } from '../src/data/catalog.ts';
import { technologies } from '../src/data/technologies.ts';

test('every topic has a locally bundled technology or tool logo', () => {
  for (const topic of catalog.topics) {
    assert.ok(technologies[topic.id]?.length, topic.id);
    for (const technology of technologies[topic.id]) {
      const svg = readFileSync(new URL(`../public/logos/${technology.logo}.svg`, import.meta.url), 'utf8');
      assert.match(svg, /<svg/);
      assert.match(svg, /<path/);
    }
  }
});
