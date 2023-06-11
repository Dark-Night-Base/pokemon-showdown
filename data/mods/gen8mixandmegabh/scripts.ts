export const Scripts: ModdedBattleScriptsData = {
	init() {
		for (const i in this.data.Items) {
			if (!this.data.Items[i].megaStone) continue;
			this.modData('Items', i).onTakeItem = false;
			const id = this.toID(this.data.Items[i].megaStone);
			this.modData('FormatsData', id).isNonstandard = null;
		}
	},
	actions: {
		canMegaEvo(pokemon) {
			if (pokemon.species.forme && ['Mega', 'Mega-X', 'Mega-Y', 'Primal'].includes(pokemon.species.forme)) return null;

			const item = pokemon.getItem();
			if (item.megaStone) {
				if (item.megaStone === pokemon.baseSpecies.name) return null;
				return item.megaStone;
			}
			if (item.id === 'blueorb' || item.id === 'redorb' || item.id === 'rustedshield' || item.id === 'rustedsword') {
				return null;
			}
			for (const moveSlot of pokemon.baseMoveSlots) {
				if (moveSlot.id === 'dragonascent') {
					return 'Rayquaza-Mega';
				}
				if (moveSlot.id === 'glaciallance') {
					return 'Calyrex-Ice';
				}
				if (moveSlot.id === 'astralbarrage') {
					return 'Calyrex-Shadow';
				}
			}
			// else if (pokemon.baseMoves.includes('dragonascent' as ID)) {
			// 	return 'Rayquaza-Mega';
			// } else if (pokemon.baseMoves.includes('glaciallance' as ID)) {
			// 	return 'Calyrex-Ice';
			// } else if (pokemon.baseMoves.includes('astralbarrage' as ID)) {
			// 	return 'Calyrex-Shadow';
			// }
			return null;
		},
		runMegaEvo(pokemon) {
			if (pokemon.species.isMega || pokemon.species.isPrimal) return false;

			// @ts-ignore
			const species: Species = this.getMixedSpecies(pokemon.m.originalSpecies, pokemon.canMegaEvo);

			// // Pokémon affected by Sky Drop cannot Mega Evolve. Enforce it here for now.
			// for (const foeActive of pokemon.foes()) {
			// 	if (foeActive.volatiles['skydrop']?.source === pokemon) {
			// 		return false;
			// 	}
			// }

			// Do we have a proper sprite for it?
			if (this.dex.species.get(pokemon.canMegaEvo!).baseSpecies === pokemon.m.originalSpecies) {
				pokemon.formeChange(species, pokemon.getItem(), true);
			} else {
				const oSpecies = this.dex.species.get(pokemon.m.originalSpecies);
				// @ts-ignore
				const oMegaSpecies = this.dex.species.get(species.originalMega);
				pokemon.formeChange(species, pokemon.getItem(), true);
				this.battle.add('-start', pokemon, oMegaSpecies.requiredItem || oMegaSpecies.requiredMove, '[silent]');
				if (oSpecies.types.length !== pokemon.species.types.length || oSpecies.types[1] !== pokemon.species.types[1]) {
					this.battle.add('-start', pokemon, 'typechange', pokemon.species.types.join('/'), '[silent]');
				}
			}

			pokemon.canMegaEvo = null;
			return true;
		},
		getMixedSpecies(originalForme, megaForme) {
			const originalSpecies = this.dex.species.get(originalForme);
			const megaSpecies = this.dex.species.get(megaForme);
			if (originalSpecies.baseSpecies === megaSpecies.baseSpecies) return megaSpecies;
			// @ts-ignore
			const deltas = this.getMegaDeltas(megaSpecies);
			// @ts-ignore
			const species = this.doGetMixedSpecies(originalSpecies, deltas);
			return species;
		},
		// todo: rewrite
		// getMegaDeltas(megaSpecies) {
		// 	const baseSpecies = this.dex.species.get(megaSpecies.baseSpecies);
		// 	const deltas: {
		// 		ability: string,
		// 		baseStats: SparseStatsTable,
		// 		weighthg: number,
		// 		originalMega: string,
		// 		requiredItem: string | undefined,
		// 		type?: string,
		// 		isMega?: boolean,
		// 		isPrimal?: boolean,
		// 	} = {
		// 		ability: megaSpecies.abilities['0'],
		// 		baseStats: {},
		// 		weighthg: megaSpecies.weighthg - baseSpecies.weighthg,
		// 		originalMega: megaSpecies.name,
		// 		requiredItem: megaSpecies.requiredItem,
		// 	};
		// 	let statId: StatID;
		// 	for (statId in megaSpecies.baseStats) {
		// 		deltas.baseStats[statId] = megaSpecies.baseStats[statId] - baseSpecies.baseStats[statId];
		// 	}
		// 	if (megaSpecies.types.length > baseSpecies.types.length) {
		// 		deltas.type = megaSpecies.types[1];
		// 	} else if (megaSpecies.types.length < baseSpecies.types.length) {
		// 		deltas.type = 'mono';
		// 	} else if (megaSpecies.types[1] !== baseSpecies.types[1]) {
		// 		deltas.type = megaSpecies.types[1];
		// 	}
		// 	if (megaSpecies.isMega) deltas.isMega = true;
		// 	if (megaSpecies.isPrimal) deltas.isPrimal = true;
		// 	return deltas;
		// },
		// doGetMixedSpecies(speciesOrForme, deltas) {
		// 	if (!deltas) throw new TypeError("Must specify deltas!");
		// 	const species = this.dex.deepClone(this.dex.species.get(speciesOrForme));
		// 	species.abilities = {'0': deltas.ability};
		// 	if (species.types[0] === deltas.type) {
		// 		species.types = [deltas.type];
		// 	} else if (deltas.type === 'mono') {
		// 		species.types = [species.types[0]];
		// 	} else if (deltas.type) {
		// 		species.types = [species.types[0], deltas.type];
		// 	}
		// 	const baseStats = species.baseStats;
		// 	for (const statName in baseStats) {
		// 		baseStats[statName] = this.battle.clampIntRange(baseStats[statName] + deltas.baseStats[statName], 1, 255);
		// 	}
		// 	species.weighthg = Math.max(1, species.weighthg + deltas.weighthg);
		// 	species.originalMega = deltas.originalMega;
		// 	species.requiredItem = deltas.requiredItem;
		// 	if (deltas.isMega) species.isMega = true;
		// 	if (deltas.isPrimal) species.isPrimal = true;
		// 	return species;
		// },
	},
};
