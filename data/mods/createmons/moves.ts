export const Moves: {[k: string]: ModdedMoveData} = {
	aurawheel: {
		inherit: true,
		onTry: undefined,
		onModifyType: undefined,
		desc: "Has a 100% chance to raise the user's Speed by 1 stage.",
		shortDesc: "100% chance to raise user Speed by 1.",
	},
	darkvoid: {
		inherit: true,
		onTry: undefined,
		desc: "Causes the target to fall asleep.",
		shortDesc: "Causes the foe(s) to fall asleep.",
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
		desc: "Lowers the user's Defense by 1 stage. If this move is successful, it breaks through the target's Baneful Bunker, Detect, King's Shield, Protect, or Spiky Shield for this turn, allowing other Pokemon to attack the target normally. If the target's side is protected by Crafty Shield, Mat Block, Quick Guard, or Wide Guard, that protection is also broken for this turn and other Pokemon may attack the target's side normally.",
		shortDesc: "Lowers user's Def by 1; breaks protect.",
	},
	ivycudgel: {
		inherit: true,
		onModifyType: undefined,
		desc: "Has a higher chance for a critical hit.",
		shortDesc: "High critical hit ratio.",
	},
	ragingbull: {
		inherit: true,
		onModifyType: undefined,
		desc: "If this attack does not miss, the effects of Reflect, Light Screen, and Aurora Veil end for the target's side of the field before damage is calculated.",
		shortDesc: "Destroys screens.",
	},
	relicsong: {
		inherit: true,
		onHit: undefined,
		onAfterMoveSecondarySelf: undefined,
		desc: "Has a 10% chance to cause the target to fall asleep.",
		shortDesc: "10% chance to sleep foe(s).",
	},
	telekinesis: {
		inherit: true,
		condition: {
			duration: 3,
			onStart(target) {
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
	},
	terastarstorm: {
		inherit: true,
		onModifyType: undefined,
		onModifyMove: undefined,
		desc: "No additional effect.",
		shortDesc: "No additional effect.",
	},
	watershuriken: {
		inherit: true,
		basePowerCallback: undefined,
		desc: "Hits two to five times. Has a 35% chance to hit two or three times and a 15% chance to hit four or five times. If one of the hits breaks the target's substitute, it will take damage for the remaining hits. If the user has the Skill Link Ability, this move will always hit five times.",
		shortDesc: "Usually goes first. Hits 2-5 times in one turn.",
	},
};
