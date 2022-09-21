export const Items: {[k: string]: ModdedItemData} = {
	xantibody: {
		name: "X-Antibody",
		spritenum: 614,
		onTakeItem(item, source) {
			return false;
		},
		num: 40001,
		gen: 8,
		isNonstandard: "Digimon",
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
		isNonstandard: "Digimon",
	},
};