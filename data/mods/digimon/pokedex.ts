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
	skullgreymon: {
		num: 40005,
		name: "Skull Greymon",
		types: ["Rock", "Ghost", "Virus"],
		gender: "N",
		baseStats: {hp: 50, atk: 85, def: 50, spa: 85, spd: 40, spe: 70},
		abilities: {0: "Cursed Body", 1: "Weak Armor", H: "Rock Head"},
		weightkg: 1,
		evos: ["Greymon"],
		eggGroups: ["Undiscovered"],
	},
};