export const Pokedex: {[k: string]: ModdedSpeciesData} = {
	// the evolution data
	// here we use evos to actually mark preevos
	/* Example:
	wargreymon: {
		inherit: true,
		evos: ["Metal Greymon"],
	},
	*/

	// actually the above won't work
	// i'm lazy and don't want to find out why
	// just do it in the main pokedex.ts
	wargreymon: {
		num: 40006,
		name: "War Greymon",
		types: ["Dragon", "Fighting", "Vaccine"],
		genderRatio: {M: 0.875, F: 0.125},
		baseStats: {hp: 80, atk: 101, def: 83, spa: 83, spd: 73, spe: 100},
		abilities: {0: "Justified", 1: "", H: ""},
		weightkg: 1,
		evos: ["Metal Greymon"],
		eggGroups: ["Undiscovered"],
		otherFormes: ["Black War Greymon", "War Greymon-X", "Black War Greymon-X"],
		formeOrder: ["War Greymon", "Black War Greymon", "War Greymon-X", "Black War Greymon-X"],
	},
};