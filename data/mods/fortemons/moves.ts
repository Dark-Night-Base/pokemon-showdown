export const Moves: {[k: string]: ModdedMoveData} = {
	grassknot: {
		inherit: true,
		onTryHit(target, pokemon, move) {
			if (target.volatiles['dynamax']) {
				this.add('-fail', pokemon, 'Dynamax');
				this.attrLastMove('[still]');
				return null;
			}
		},
	},
};
