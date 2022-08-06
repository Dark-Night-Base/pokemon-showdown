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
			// still lasts 5 turns, don't know why
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
	braveshield: {
		num: 40004,
		accuracy: 100,
		basePower: 0,
		category: "Status",
		name: "Brave Shield",
		pp: 10,
		priority: 4,
		flags: {},
		stallingMove: true,
		volatileStatus: 'braveshield',
		onPrepareHit(pokemon) {
			return !!this.queue.willAct() && this.runEvent('StallMove', pokemon);
		},
		onHit(pokemon) {
			pokemon.addVolatile('stall');
		},
		condition: {
			duration: 1,
			onStart(target) {
				this.add('-singleturn', target, 'Protect');
			},
			onTryHitPriority: 3,
			onTryHit(target, source, move) {
				if (!move.flags['protect'] || move.category === 'Status') {
					if (['gmaxoneblow', 'gmaxrapidflow'].includes(move.id)) return;
					if (move.isZ || move.isMax) target.getMoveHitData(move).zBrokeProtect = true;
					return;
				}
				if (move.smartTarget) {
					move.smartTarget = false;
				} else {
					this.add('-activate', target, 'move: Protect');
				}
				const lockedmove = source.getVolatile('lockedmove');
				if (lockedmove) {
					// Outrage counter is reset
					if (source.volatiles['lockedmove'].duration === 2) {
						delete source.volatiles['lockedmove'];
					}
				}
				if (this.checkMoveMakesContact(move, source, target)) {
					this.boost({atk: +1}, target, target, this.dex.getActiveMove("Brave Shield"));
				}
				return this.NOT_FAIL;
			},
			onHit(target, source, move) {
				if (move.isZOrMaxPowered && this.checkMoveMakesContact(move, source, target)) {
					this.boost({atk: +1}, target, target, this.dex.getActiveMove("Brave Shield"));
				}
			},
		},
		secondary: null,
		target: "self",
		type: "Fire",
	},
};