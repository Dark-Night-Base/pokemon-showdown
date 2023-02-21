export const Learnsets: {[k: string]: ModdedLearnsetData} = {
	magikarp: {
		learnset: {
			bounce: ["8M", "7T", "7S7", "6T", "5T", "5D", "5S5", "4T"],
			celebrate: ["6S6"],
			dragonrage: ["9L1"],
			flail: ["9L25", "8L25", "7L30", "7V", "6L30", "5L30", "5S5", "4L30", "3L30"],
			happyhour: ["6S6"],
			hydropump: ["8M", "5S5"],
			splash: ["9L1", "8L1", "8V", "7L1", "7V", "7S7", "6L1", "6S6", "5L1", "5D", "5S5", "4L1", "4S0", "4S1", "4S2", "4S3", "4S4", "3L1"],
			tackle: ["9L15", "8L15", "8V", "7L15", "7V", "6L15", "5L15", "4L15", "3L15"],
		},
		eventData: [
			{generation: 4, level: 5, gender: "M", nature: "Relaxed", moves: ["splash"], pokeball: "pokeball"},
			{generation: 4, level: 6, gender: "F", nature: "Rash", moves: ["splash"], pokeball: "pokeball"},
			{generation: 4, level: 7, gender: "F", nature: "Hardy", moves: ["splash"], pokeball: "pokeball"},
			{generation: 4, level: 5, gender: "F", nature: "Lonely", moves: ["splash"], pokeball: "pokeball"},
			{generation: 4, level: 4, gender: "M", nature: "Modest", moves: ["splash"], pokeball: "pokeball"},
			{generation: 5, level: 99, shiny: true, gender: "M", moves: ["flail", "hydropump", "bounce", "splash"], pokeball: "cherishball"},
			{generation: 6, level: 1, shiny: 1, moves: ["splash", "celebrate", "happyhour"], pokeball: "cherishball"},
			{generation: 7, level: 19, shiny: true, moves: ["splash", "bounce"], pokeball: "cherishball"},
		],
		encounters: [
			{generation: 1, level: 5},
		],
	},
};
