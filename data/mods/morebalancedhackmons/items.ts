export const Items: {[k: string]: ModdedItemData} = {
	covertcloak: {
		inherit: true,
		// todo: just make stoneaxe and ceaselessedge effects secondaries plz ;-;
	},
	maliciousarmor: {
		name: "Malicious Armor",
		spritenum: 0, // TODO
		fling: {
			basePower: 100,
			volatileStatus: 'torment',
		},
		onTakeItem: false,
		onHit(target, source, move) {
			// todo: test
			if (['corrosivegas', 'knockoff', 'switcheroo', 'trick'].includes(move.id)) {
				source.addVolatile('torment');
			}
		},
		num: -403,
		gen: 9,
	},
	roomservice: {
		inherit: true,
		onStart(pokemon) {},
		onAnyPseudoWeatherChange() {},
		boosts: {},
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
	},
	utilityumbrella: {
		inherit: true,
		// todo: maybe this needs to be implemented in scripts.ts
	},
};
