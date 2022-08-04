export const Moves: {[k: string]: ModdedMoveData} = {
	greysword: {
		num: 40001,
		accuracy: 100,
		basePower: 100,
		category: "Physical",
		name: "Grey Sword",
		pp: 5,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		ignoreEvasion: true,
		ignoreDefensive: true,
		secondary: null,
		target: "normal",
		type: "Fire",
		contestType: "Cool",
	},
	garurucannon: {
		num: 40002,
		accuracy: 90,
		basePower: 110,
		category: "Special",
		name: "Garuru Cannon",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		target: "allAdjacentFoes",
		type: "Ice",
		contestType: "Beautiful",
	},
	alldelete: {
		num: 40003,
		accuracy: 95,
		basePower: 120,
		category: "Physical",
		name: "All Delete",
		pp: 5,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onTry(source) {
			if (source.species.name === 'Omegamon-X') {
				return;
			}
			this.hint("Only a Pokemon whose form is Omegamon-X can use this move.");
			if (source.species.name === 'Omegamon') {
				this.attrLastMove('[still]');
				this.add('-fail', source, 'move: All Delete', '[forme]');
				return null;
			}
			this.attrLastMove('[still]');
			this.add('-fail', source, 'move: All Delete');
			return null;
		},
		volatileStatus: 'healblock',
		condition: {
			duration: 3,
			// is this necessary?
			durationCallback(target, source, effect) {
				return 3;
			},
			onStart(pokemon, source) {
				this.add('-start', pokemon, 'move: Heal Block');
				source.moveThisTurnResult = true;
			},
			onDisableMove(pokemon) {
				for (const moveSlot of pokemon.moveSlots) {
					if (this.dex.moves.get(moveSlot.id).flags['heal']) {
						pokemon.disableMove(moveSlot.id);
					}
				}
			},
			onBeforeMovePriority: 6,
			onBeforeMove(pokemon, target, move) {
				if (move.flags['heal'] && !move.isZ && !move.isMax) {
					this.add('cant', pokemon, 'move: Heal Block', move);
					return false;
				}
			},
			onModifyMove(move, pokemon, target) {
				if (move.flags['heal'] && !move.isZ && !move.isMax) {
					this.add('cant', pokemon, 'move: Heal Block', move);
					return false;
				}
			},
			onResidualOrder: 20,
			onEnd(pokemon) {
				this.add('-end', pokemon, 'move: Heal Block');
			},
			onTryHeal(damage, target, source, effect) {
				if ((effect?.id === 'zpower') || this.effectState.isZ) return damage;
				return false;
			},
			onRestart(target, source) {
				this.add('-fail', target, 'move: Heal Block'); // Succeeds to supress downstream messages
				if (!source.moveThisTurnResult) {
					source.moveThisTurnResult = false;
				}
			},
		},
		secondary: null,
		target: "normal",
		type: "Normal",
		contestType: "Clever",
	},
};