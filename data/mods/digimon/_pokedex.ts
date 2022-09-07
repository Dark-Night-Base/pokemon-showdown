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
		inherit: true,
		evos: ["Metal Greymon"],
	},
	lucemonfalldown: {
		inherit: true,
		evos: ["Lucemon"],
	},
};