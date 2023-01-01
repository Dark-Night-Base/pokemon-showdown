export const Items: {[k: string]: ModdedItemData} = {
	// covert cloak implemented in moves.ts
	maliciousarmor: {
		inherit: true,
		fling: {
			basePower: 100,
			volatileStatus: 'torment',
		},
		onTakeItem: false,
		onHit(target, source, move) {
			if (['corrosivegas', 'covet', 'knockoff', 'switcheroo', 'thief', 'trick'].includes(move.id)) {
				source.addVolatile('torment');
				return;
			}
			if (target !== source && !source.item) {
				if (source.hasAbility('magician') && move.category !== 'Status') {
					source.addVolatile('torment');
					return;
				}
				if (source.hasAbility('pickpocket') && move.flags.contact) {
					source.addVolatile('torment');
					return;
				}
			}
		},
		desc: "When any Pokemon attempts to remove this item, they are inflicted with Torment.",
		shortDesc: "When any Pokemon attempts to remove this item, they are inflicted with Torment.",
	},
	roomservice: {
		inherit: true,
		onStart(pokemon) {},
		onAnyPseudoWeatherChange() {},
		boosts: undefined,
		// implemented in moves.ts
		desc: "Holder's use of room moves lasts 8 turns instead of 5.",
		shortDesc: "Holder's use of room moves lasts 8 turns instead of 5.",
	},
	souldew: {
		inherit: true,
		onBasePower() {},
		onModifySpAPriority: 1,
		onModifySpA(spa, pokemon) {
			if (pokemon.baseSpecies.num === 380 || pokemon.baseSpecies.num === 381) {
				return this.chainModify(1.5);
			}
		},
		onModifySpDPriority: 2,
		onModifySpD(spd, pokemon) {
			if (pokemon.baseSpecies.num === 380 || pokemon.baseSpecies.num === 381) {
				return this.chainModify(1.5);
			}
		},
		onTakeItem(item, pokemon, source) {
			if (source?.baseSpecies.num === 380 || pokemon.baseSpecies.num === 380) {
				return false;
			}
			if (source?.baseSpecies.num === 381 || pokemon.baseSpecies.num === 381) {
				return false;
			}
			return true;
		},
		desc: "If held by a Latias or a Latios, its Sp. Atk and Sp. Def are 1.5x.",
		shortDesc: "If held by a Latias or a Latios, its Sp. Atk and Sp. Def are 1.5x.",
	},
	utilityumbrella: {
		inherit: true,
		// implemented in scripts.ts
		onStart(target) {
			if (!target.ignoringItem()) {
				this.debug('Utility Umbrella');
				this.add('-item', target, 'Utility Umbrella');
			}
		},
		desc: "The effects of weather conditions are disabled.",
		shortDesc: "The effects of weather conditions are disabled.",
	},
};
