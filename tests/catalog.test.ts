import test from 'node:test';
import assert from 'node:assert/strict';
import { catalog } from '../src/data/catalog.ts';
import { roadmap } from '../src/data/roadmap.ts';
import { assertValidCatalog, validateCatalog } from '../src/lib/catalog-validation.ts';

test('canonical catalog validates and preserves all nine V1 IDs and resource links', () => {
  assert.deepEqual(validateCatalog(catalog), []);
  const legacyIds = [
    'planning', 'typescript', 'frontend', 'backend', 'database', 'integration', 'mobile', 'testing', 'devops',
  ];
  for (const id of legacyIds) assert.ok(roadmap.some((topic) => topic.id === id));
  assert.equal(roadmap.length, 13);
  assert.ok(catalog.resources.length >= 17);
  for (const topic of roadmap) {
    const original = catalog.topics.find((entry) => entry.id === topic.id)!;
    assert.deepEqual(topic.prerequisites, original.prerequisiteIds);
    assert.deepEqual(topic.resources, original.resourceIds.map((id) => catalog.resources.find((resource) => resource.id === id)!.url));
  }
});

test('every topic has multiple resources and free certificates have dated provider evidence', () => {
  for (const topic of catalog.topics) assert.ok(topic.resourceIds.length >= 2, topic.id);
  const certificates = catalog.resources.filter((resource) => resource.certificateStatus === 'free');
  assert.equal(certificates.length, 7);
  for (const resource of certificates) {
    assert.equal(resource.freeToAccess, true);
    assert.ok(resource.verificationUrl?.startsWith('https://'));
    assert.match(resource.verifiedAt!, /^\d{4}-\d{2}-\d{2}$/);
    assert.ok(resource.certificateRequirements);
  }
});

for (const kind of ['topics', 'stages', 'resources'] as const) {
  test(`rejects duplicate ${kind} IDs`, () => {
    const copy = structuredClone(catalog);
    const invalid = { ...copy, [kind]: [...copy[kind], copy[kind][0]] };
    assert.ok(validateCatalog(invalid).some((error) => error.startsWith('Duplicate')));
    assert.throws(() => assertValidCatalog(invalid), /Invalid roadmap catalog/);
  });
}

test('rejects unknown stage, resource, and prerequisite references', () => {
  const copy = structuredClone(catalog);
  Object.assign(copy.topics[0], { stageId: 'missing', resourceIds: ['missing'], prerequisiteIds: ['missing'] });
  const errors = validateCatalog(copy);
  for (const field of ['stage', 'resource', 'prerequisite']) {
    assert.ok(errors.some((error) => error.includes(`Unknown ${field}`)));
  }
});

test('rejects self-dependencies and longer cycles with a useful path', () => {
  const copy = structuredClone(catalog);
  copy.topics[0].prerequisiteIds = ['planning'];
  assert.ok(validateCatalog(copy).includes('Self-dependency: planning'));
  copy.topics[0].prerequisiteIds = ['frontend'];
  copy.topics.find((topic) => topic.id === 'typescript')!.prerequisiteIds = ['planning'];
  assert.ok(validateCatalog(copy).some((error) => error.includes('planning -> frontend -> typescript -> planning')));
});

test('permits shared dependencies and cross-stage edges without reporting a cycle', () => {
  const copy = structuredClone(catalog);
  copy.topics.find((topic) => topic.id === 'typescript')!.prerequisiteIds = ['planning'];
  assert.deepEqual(validateCatalog(copy), []);
});

test('rejects missing learning content and invalid effort ranges', () => {
  const copy = structuredClone(catalog);
  Object.assign(copy.topics[0], { objectives: [], practiceTasks: [' '], acceptanceCriteria: [], estimatedHours: { min: 5, max: 2 } });
  const errors = validateCatalog(copy);
  for (const field of ['objectives', 'practiceTasks', 'acceptanceCriteria', 'estimated hours']) {
    assert.ok(errors.some((error) => error.includes(field)));
  }
});

test('rejects unsafe URLs and unverified access/certificate claims', () => {
  const copy = structuredClone(catalog);
  Object.assign(copy.resources[0], { url: 'javascript:alert(1)', freeToAccess: true, certificateStatus: 'free' });
  const errors = validateCatalog(copy);
  assert.ok(errors.some((error) => error.includes('Invalid resource URL')));
  assert.ok(errors.some((error) => error.includes('Verification date required')));
});

test('rejects impossible verification dates and accepts a valid dated claim', () => {
  const copy = structuredClone(catalog);
  Object.assign(copy.resources[0], { freeToAccess: true, verifiedAt: '2026-02-30' });
  assert.ok(validateCatalog(copy).some((error) => error.includes('Invalid verification date')));
  copy.resources[0].verifiedAt = '2026-10-23';
  assert.deepEqual(validateCatalog(copy), []);
});
