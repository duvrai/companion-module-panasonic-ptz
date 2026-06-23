import assert from 'node:assert/strict'
import { applyPresetEntryLine, isPresetStored, parsePresetEntryLine } from './preset-entries.js'

const data = { presetEntryBanks: { pE00: [], pE01: [], pE02: [] }, storedPresets: [] }

applyPresetEntryLine(data, 'pE000000000007')
applyPresetEntryLine(data, 'pE010000000400')
applyPresetEntryLine(data, 'pE020000000000')

assert.deepEqual(parsePresetEntryLine('pE000000000007')?.presets, [1, 2, 3])
assert.deepEqual(parsePresetEntryLine('pE010000000400')?.presets, [51])
assert.deepEqual(data.storedPresets, [1, 2, 3, 51])
assert.equal(isPresetStored(data, '01'), true)
assert.equal(isPresetStored(data, '03'), true)
assert.equal(isPresetStored(data, '11'), false)
assert.equal(isPresetStored(data, '04'), false)

console.log('preset-entries.test.js passed')