export const Moves: {[k: string]: ModdedMoveData} = {
	aurawheel: {
		inherit: true,
		onTry: undefined,
		onModifyType: undefined,
	},
	darkvoid: {
		inherit: true,
		onTry: undefined,
	},
	dive: {
		inherit: true,
		onTryMove(attacker, defender, move) {
			if (attacker.removeVolatile(move.id)) {
				return;
			}
			this.add('-prepare', attacker, move.name);
			if (!this.runEvent('ChargeMove', attacker, defender, move)) {
				return;
			}
			attacker.addVolatile('twoturnmove', defender);
			return null;
		},
	},
	hyperspacefury: {
		inherit: true,
		onTry: undefined,
	},
	ivycudgel: {
		inherit: true,
		onModifyType: undefined,
	},
	relicsong: {
		inherit: true,
		onHit: undefined,
		onAfterMoveSecondarySelf: undefined,
	},
	telekinesis: {
		inherit: true,
		condition: {
			duration: 3,
			onStart(target) {
				if (['Diglett', 'Dugtrio', 'Palossand', 'Sandygast'].includes(target.baseSpecies.baseSpecies) ||
						target.baseSpecies.name === 'Gengar-Mega') {
					this.add('-immune', target);
					return null;
				}
				if (target.volatiles['smackdown'] || target.volatiles['ingrain']) return false;
				this.add('-start', target, 'Telekinesis');
			},
			onAccuracyPriority: -1,
			onAccuracy(accuracy, target, source, move) {
				if (move && !move.ohko) return true;
			},
			onImmunity(type) {
				if (type === 'Ground') return false;
			},
			onResidualOrder: 19,
			onEnd(target) {
				this.add('-end', target, 'Telekinesis');
			},
		},
		secondary: null,
		target: "normal",
		type: "Psychic",
		zMove: {boost: {spa: 1}},
		contestType: "Clever",
	},
	terastarstorm: {
		inherit: true,
		onModifyType: undefined,
		onModifyMove: undefined,
	},
	watershuriken: {
		inherit: true,
		basePowerCallback: undefined,
	},
};
