export const Pokedex: {[k: string]: ModdedSpeciesData} = {
	shedinja: {
		inherit: true,
		maxHP: undefined,
	},
	ogerpon: {
		inherit: true,
		forceTeraType: undefined,
	},
	ogerponwellspring: {
		inherit: true,
		forceTeraType: undefined,
	},
	ogerponhearthflame: {
		inherit: true,
		forceTeraType: undefined,
	},
	ogerponcornerstone: {
		inherit: true,
		forceTeraType: undefined,
	},
	ogerpontealtera: {
		inherit: true,
		forceTeraType: undefined,
	},
	ogerponwellspringtera: {
		inherit: true,
		forceTeraType: undefined,
	},
	ogerponhearthflametera: {
		inherit: true,
		forceTeraType: undefined,
	},
	ogerponcornerstonetera: {
		inherit: true,
		forceTeraType: undefined,
	},
	terapagos: {
		inherit: true,
		forceTeraType: undefined,
	},
	terapagosterastal: {
		inherit: true,
		forceTeraType: undefined,
	},
	terapagosstellar: {
		inherit: true,
		forceTeraType: undefined,
	},

	// bc-specific pokemon
	jobapplication: {
		num: -1001,
		name: "JOB APPLICATION",
		types: ["Ghost", "Normal"],
		gender: "N",
		baseStats: {hp: 130, atk: 130, def: 70, spa: 70, spd: 70, spe: 60},
		abilities: {0: "Anger Point"},
		weightkg: 1,
		eggGroups: [],
	},
	shadelisk: {
		num: -1002,
		name: "Shadelisk",
		types: ["Ice", "Poison"],
		baseStats: {hp: 82, atk: 118, def: 105, spa: 75, spd: 64, spe: 86},
		abilities: {0: "Long Reach", 1: "Moxie", H: "Regenerator"},
		weightkg: 1,
		eggGroups: [],
	},
	chilupo: {
		num: -1003,
		name: "Chilupo",
		types: ["Water", "Ice"],
		baseStats: {hp: 95, atk: 105, def: 80, spa: 109, spd: 60, spe: 111},
		abilities: {0: "Water Veil", 1: "Pixilate", H: "Refrigerate"},
		weightkg: 1,
		eggGroups: [],
	},
	gourgeistgigantic: {
		num: -1004,
		name: "Gourgeist-Gigantic",
		types: ["Ghost", "Grass"],
		baseStats: {hp: 155, atk: 111, def: 69, spa: 111, spd: 75, spe: 19},
		abilities: {0: "Pickup", 1: "Frisk", H: "Filter"},
		weightkg: 1,
		eggGroups: [],
	},
	dinocean: {
		num: -1005,
		name: "Dinocean",
		types: ["Water", "Dragon"],
		baseStats: {hp: 110, atk: 105, def: 111, spa: 73, spd: 111, spe: 30},
		abilities: {0: "Torrent", H: "Simple"},
		weightkg: 1,
		eggGroups: [],
	},
};