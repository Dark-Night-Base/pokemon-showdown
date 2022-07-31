export const Items: {[k: string]: ModdedItemData} = {
	xantibody: {
		name: "X-Antibody",
		spritenum: 614,
		megaStone: "*",
		megaEvolves: "*",
		itemUser: ["*"],
		onTakeItem(item, source) {
			return false;
		},
		num: 10000,
		gen: 8,
	},
};