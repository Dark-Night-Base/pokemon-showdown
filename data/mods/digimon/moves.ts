export const Moves: {[k: string]: ModdedMoveData} = {
	darkvoid: {
		inherit: true,
		accuracy: 80,
		isNonstandard: null,
		onTry(source, target, move) {
			return null;
		},
		desc: "Causes the target to fall asleep.",
		shortDesc: "Causes the foe(s) to fall asleep.",
	},
};