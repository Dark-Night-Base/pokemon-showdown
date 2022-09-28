export const Items: {[k: string]: ModdedItemData} = {
	xantibody: {
		name: "X-Antibody",
		spritenum: 614,
		onTakeItem(item, source) {
			return false;
		},
		num: 40001,
		gen: 8,
	},
	holyring: {
		name: "Holy Ring",
		spritenum: 410,
		fling: {
			basePower: 80,
		},
		onBasePowerPriority: 16,
		onBasePower(basePower, user, target, move) {
			if (user.hasType('Light')) {
				this.debug('Holy Ring boosting power');
				return this.chainModify([4505, 4096]);
			}
		},
		num: 40002,
		gen: 8,
	},
	omegasword: {
		name: "Omega Sword",
		spritenum: 698,
		fling: {
			basePower: 120,
		},
		onBasePowerPriority: 15,
		onBasePower(basePower, user, target, move) {
			if (user.baseSpecies.num === 40142 && (move.type === 'Fire' || move.type === 'Ice')) {
				return this.chainModify([4915, 4096]);
			}
		},
		onTakeItem(item, pokemon, source) {
			if ((source && source.baseSpecies.num === 40142) || pokemon.baseSpecies.num === 40142) {
				return false;
			}
			return true;
		},
		forcedForme: "Imperialdramon-Paladin",
		itemUser: ["Imperialdramon-Paladin"],
		num: 40003,
		gen: 8,
	},
};