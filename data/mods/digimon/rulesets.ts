export const Rulesets: {[k: string]: ModdedFormatData} = {
	standarddigimon: {
		effectType: 'ValidatorRule',
		name: 'Standard Digimon',
		desc: "The standard ruleset for Digimon.",
		ruleset: [
			'Cancel Mod', 'Dynamax Clause', 'Endless Battle Clause', 'HP Percentage Mod', 'Obtainable', 'Team Preview', 
			'Nickname Clause', 'Species Clause', 
		],
		onChangeSet(set) {
			const species = this.dex.species.get(set.species);
			const isX = species.forme === 'X';
			if (isX) {
				const baseSpecies = this.dex.species.get(species.baseSpecies);
				const ability = this.dex.abilities.get(set.ability);
				set.species = baseSpecies.name;
				set.item = 'X-Antibody';
				for (const a in baseSpecies.abilities) {
					if (this.dex.abilities.get(a) === ability) {
						return;
					}
				}
				set.ability = baseSpecies.abilities[0];
			}
		},
		// digimon validate moves
		// sim/team-validator.ts::validateMoves()
		// validateSet(set, teamHas) {
		// 	const dex = this.dex;
		// 	const ruleTable = this.ruleTable;

		// 	// set args
		// 	const species = dex.species.get(set.species);
		// 	const moves = set.moves;
		// 	const setSources = this.allSources(species);
		// 	const name = species.name;
		// 	// set args

		// 	const preEvos = species.evos;

		// 	const badMoves = [];
		// 	const problems = [];

		// 	const checkCanLearn = (ruleTable.checkCanLearn && ruleTable.checkCanLearn[0] || this.checkCanLearn);
		// 	for (const moveName of moves) {
		// 		const move = dex.moves.get(moveName);
		// 		const problem = checkCanLearn.call(this, move, species, setSources, set);
		// 		if (problem) {
		// 			badMoves.push(move);
		// 		}
		// 	}

		// 	if (badMoves.length) {
		// 		let canPreEvoLearn = true;
		// 		for (const preEvo of preEvos) {
		// 			canPreEvoLearn = true;
		// 			const preEvoSpecies = dex.species.get(preEvo);
		// 			for (const move of badMoves) {
		// 				const problem = checkCanLearn.call(this, move, preEvoSpecies);
		// 				if (problem) {
		// 					canPreEvoLearn = false;
		// 					break;
		// 				}
		// 			}
		// 			if (canPreEvoLearn === true) {
		// 				break;
		// 			}
		// 		}
		// 		if (canPreEvoLearn === false) {
		// 			for (const moveName of moves) {
		// 				const move = dex.moves.get(moveName);
		// 				const problem = checkCanLearn.call(this, move, species, setSources, set);
		// 				if (problem) {
		// 					problems.push(`${name}${problem}`);
		// 					break;
		// 				}
		// 			}
		// 		}
		// 	}

		// 	return problems.length ? problems : null;
		// },
	},
	dynamaxclause: {
		inherit: true,
		onBegin() {
			for (const side of this.sides) {
				side.dynamaxUsed = true;
			}
		},
	},
	endlessbattleclause: {
		inherit: true,
		onBegin() {},
	},
	hppercentagemod: {
		inherit: true,
		onBegin() {
			this.reportPercentages = true;
		},
	},
	obtainable: {
		inherit: true,
		ruleset: ['Obtainable Abilities', 'Obtainable Formes', 'EV Limit = Auto', 'Obtainable Misc'],
		onValidateSet(this, set, format, setHas, teamHas) {
			const dex = this.dex;
			const ruleTable = this.ruleTable;

			// set args
			const species = dex.species.get(set.species);
			const moves = set.moves;
			const setSources = this.allSources(species);
			const name = species.name;
			// set args

			// check digimon
			if (species.num <= 40000) {
				return [`${species.baseSpecies} is not a Digimon.`];
			}

			// check moves
			// sim/team-validator.ts::validateMoves()
			const preEvos = species.evos;

			const badMoves = [];
			const problems = [];

			const checkCanLearn = (ruleTable.checkCanLearn && ruleTable.checkCanLearn[0] || this.checkCanLearn);
			for (const moveName of moves) {
				const move = dex.moves.get(moveName);
				const problem = checkCanLearn.call(this, move, species, setSources, set);
				if (problem) {
					badMoves.push(move);
				}
			}

			if (badMoves.length) {
				let canPreEvoLearn = true;
				for (const preEvo of preEvos) {
					canPreEvoLearn = true;
					const preEvoSpecies = dex.species.get(preEvo);
					for (const move of badMoves) {
						const problem = checkCanLearn.call(this, move, preEvoSpecies);
						if (problem) {
							canPreEvoLearn = false;
							break;
						}
					}
					if (canPreEvoLearn === true) {
						break;
					}
				}
				if (canPreEvoLearn === false) {
					for (const moveName of moves) {
						const move = dex.moves.get(moveName);
						const problem = checkCanLearn.call(this, move, species, setSources, set);
						if (problem) {
							problems.push(`${name}${problem}`);
							break;
						}
					}
				}
			}

			return problems;
		},
	},
	speciesclause: {
		inherit: true,
		desc: "Prevents teams from having more than one Digimon from the same species",
		onBegin() {
			this.add('rule', 'Species Clause: Limit one of each Digimon');
		},
	},
};