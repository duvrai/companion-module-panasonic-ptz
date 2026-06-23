import { MODELS, SERIES_SPECS } from './models.js'

export function getAndUpdateSeries(self) {
	// Set the model and series selected, if in auto, dettect what model is connected via TCP
	if (self.config.model === 'Auto') {
		self.data.model = self.data.modelTCP
	} else {
		self.data.model = self.config.model
	}

	if (self.data.model !== 'NaN') {
		const modelEntry = MODELS.find((entry) => entry.id == self.data.model)
		if (modelEntry) {
			self.data.series = modelEntry.series
		}
	}

	// Find the specific commands for a given series
	let SERIES =
		self.data.series !== 'Auto' && self.data.series !== 'Other'
			? SERIES_SPECS.find((SERIES_SPECS) => SERIES_SPECS.id == self.data.series)
			: undefined

	return SERIES || SERIES_SPECS.find((SERIES_SPECS) => SERIES_SPECS.id == 'Other')
}
