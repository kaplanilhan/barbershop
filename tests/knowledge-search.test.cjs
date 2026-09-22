const assert = require('node:assert/strict')
const test = require('node:test')

const { searchKnowledge } = require('../.test-dist/lib/knowledge-search.js')

test('finds FAQs using normalized German wording and aliases', () => {
  assert.equal(searchKnowledge('Was kostet ein Haarschnitt?')[0]?.id, 'haircut-price')
  assert.equal(searchKnowledge('GUTSCHEIN')[0]?.id, 'gift-cards')
  assert.equal(searchKnowledge('Termin buchen').some(({ id }) => id === 'appointment'), true)
})

test('finds structured services and business information', () => {
  assert.equal(searchKnowledge('Bart')[0]?.id, 'bartpflege')
  assert.equal(searchKnowledge('Wann ist geöffnet?')[0]?.id, 'opening-hours')
  assert.equal(searchKnowledge('Wo ist die Adresse?')[0]?.id, 'contact')
})

test('returns no answer for short, stop-word-only, or unknown queries', () => {
  assert.deepEqual(searchKnowledge('x'), [])
  assert.deepEqual(searchKnowledge('Wie ist das?'), [])
  assert.deepEqual(searchKnowledge('Quantenphysik'), [])
})

test('caps result limits and query length without exposing ranking scores', () => {
  const results = searchKnowledge('Termin', 100)

  assert.ok(results.length <= 10)
  assert.equal(Object.hasOwn(results[0] ?? {}, 'score'), false)
  assert.deepEqual(searchKnowledge('x'.repeat(121)), [])
})
