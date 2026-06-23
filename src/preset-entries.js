const PRESET_ENTRY_BANKS = {
	pE00: { base: 1, bits: 40 },
	pE01: { base: 41, bits: 40 },
	pE02: { base: 81, bits: 20 },
}

export const PRESET_NUMBER_CHOICES = Array.from({ length: 100 }, (_, index) => {
	const preset = index + 1
	return {
		id: String(preset).padStart(2, '0'),
		label: `Preset ${preset}`,
	}
})

export function parsePresetEntryLine(line) {
	const match = line.trim().match(/^pE(00|01|02)([0-9A-Fa-f]+)$/i)
	if (!match) return null

	const bankKey = `pE${match[1]}`
	const bank = PRESET_ENTRY_BANKS[bankKey]
	const value = parseInt(match[2].slice(-10), 16)
	const presets = []

	for (let bit = 1; bit <= bank.bits; bit++) {
		if ((value >> (bit - 1)) & 1) {
			presets.push(bank.base + bit - 1)
		}
	}

	return { bankKey, presets }
}

export function applyPresetEntryLine(data, line) {
	const parsed = parsePresetEntryLine(line)
	if (!parsed) return false

	if (!data.presetEntryBanks) {
		data.presetEntryBanks = { pE00: [], pE01: [], pE02: [] }
	}

	data.presetEntryBanks[parsed.bankKey] = parsed.presets
	rebuildStoredPresets(data)
	return true
}

export function rebuildStoredPresets(data) {
	const banks = data.presetEntryBanks ?? { pE00: [], pE01: [], pE02: [] }
	data.storedPresets = [...banks.pE00, ...banks.pE01, ...banks.pE02].sort((a, b) => a - b)
}

export function isPresetStored(data, presetNumber) {
	const preset = Number(presetNumber)
	if (!Number.isFinite(preset) || preset < 1 || preset > 100) {
		return false
	}

	return (data.storedPresets ?? []).includes(preset)
}