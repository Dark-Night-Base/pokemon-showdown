export const Pokedex: {[k: string]: ModdedSpeciesData} = {
	brutebonnet: {
		inherit: true,
		baseStats: {hp: 111, atk: 127, def: 109, spa: 59, spd: 109, spe: 55},
	},
	calyrexice: {
		inherit: true,
		baseStats: {hp: 100, atk: 175, def: 140, spa: 65, spd: 140, spe: 60},
	},
	calyrexshadow: {
		inherit: true,
		baseStats: {hp: 100, atk: 85, def: 100, spa: 135, spd: 100, spe: 160},
	},
	camerupt: {
		inherit: true,
		baseStats: {hp: 80, atk: 150, def: 100, spa: 90, spd: 100, spe: 20},
	},
	cameruptmega: {
		inherit: true,
		baseStats: {hp: 80, atk: 120, def: 140, spa: 150, spd: 140, spe: 10},
		abilities: {0: "Contrary"},
	},
	cresselia: {
		inherit: true,
		baseStats: {hp: 120, atk: 70, def: 130, spa: 75, spd: 130, spe: 75},
	},
	irontreads: {
		inherit: true,
		baseStats: {hp: 130, atk: 110, def: 80, spa: 50, spd: 120, spe: 80},
	},
	salamence: {
		inherit: true,
		baseStats: {hp: 115, atk: 135, def: 75, spa: 115, spd: 75, spe: 85},
	},
	salamencemega: {
		inherit: true,
		baseStats: {hp: 115, atk: 135, def: 115, spa: 135, spd: 75, spe: 125},
		abilities: {0: "Delta Stream"},
	},
	tyranitar: {
		inherit: true,
		types: ["Dark", "Rock"],
		baseStats: {hp: 100, atk: 154, def: 90, spa: 75, spd: 100, spe: 81},
	},
	tyranitarmega: {
		inherit: true,
		types: ["Dark", "Steel"],
		baseStats: {hp: 100, atk: 144, def: 130, spa: 145, spd: 110, spe: 71},
		abilities: {0: "Berserk"},
	},
	zamazenta: {
		inherit: true,
		baseStats: {hp: 92, atk: 130, def: 115, spa: 70, spd: 115, spe: 138},
	},
	zamazentacrowned: {
		inherit: true,
		baseStats: {hp: 92, atk: 130, def: 145, spa: 60, spd: 145, spe: 128},
	},
};
