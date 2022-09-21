export const Moves: {[k: string]: ModdedMoveData} = {
	aromaticmist: {
		inherit: true,
		type: "Grass",
	},
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
	flowershield: {
		inherit: true,
		type: "Grass",
	},
	greysword: {
		num: 40001,
		accuracy: 100,
		basePower: 100,
		category: "Physical",
		isNonstandard: "Digimon",
		name: "Grey Sword",
		pp: 5,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		ignoreEvasion: true,
		ignoreDefensive: true,
		secondary: null,
		target: "normal",
		type: "Fire",
	},
	garurucannon: {
		num: 40002,
		accuracy: 90,
		basePower: 110,
		category: "Special",
		isNonstandard: "Digimon",
		name: "Garuru Cannon",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		target: "allAdjacentFoes",
		type: "Ice",
	},
	alldelete: {
		num: 40003,
		accuracy: 95,
		basePower: 120,
		category: "Physical",
		isNonstandard: "Digimon",
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
	},
	braveshield: {
		num: 40004,
		accuracy: 100,
		basePower: 0,
		category: "Status",
		isNonstandard: "Digimon",
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
	gaiaforce: {
		num: 40005,
		accuracy: 90,
		basePower: 110,
		category: "Special",
		isNonstandard: "Digimon",
		name: "Gaia Force",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		target: "allAdjacentFoes",
		type: "Ground",
	},
	bravetornado: {
		num: 40006,
		accuracy: 100,
		basePower: 90,
		category: "Physical",
		isNonstandard: "Digimon",
		name: "Brave Tornado",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		critRatio: 2,
		secondary: null,
		target: "normal",
		type: "Fighting",
	},
	dramonkiller: {
		num: 40007,
		accuracy: 100,
		basePower: 80,
		category: "Physical",
		isNonstandard: "Digimon",
		name: "Dramon Killer",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		basePowerCallback(pokemon, target, move) {
			if (target.species.name.includes('dramon')) {
				this.debug("3x damage to dramon");
				return move.basePower * 3;
			}
			return move.basePower;
		},
		target: "normal",
		type: "Dragon",
	},
	cocytusbreath: {
		num: 40008,
		accuracy: 90,
		basePower: 65,
		category: "Special",
		isNonstandard: "Digimon",
		name: "Cocytus Breath",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		willCrit: true,
		secondary: {
			chance: 10,
			status: 'frz',
		},
		target: "normal",
		type: "Ice",
	},
	garurutomahawk: {
		num: 40009,
		accuracy: 80,
		basePower: 100,
		category: "Special",
		isNonstandard: "Digimon",
		name: "Garuru Tomahawk",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		critRatio: 2,
		secondary: {
			chance: 10,
			status: 'frz',
		},
		target: "normal",
		type: "Steel",
	},
	gracecrossfreezer: {
		num: 40010,
		accuracy: 90,
		basePower: 130,
		category: "Special",
		isNonstandard: "Digimon",
		name: "Grace Cross Freezer",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		self: {
			boosts: {
				spa: -2,
			},
		},
		secondary: null,
		target: "normal",
		type: "Ice",
	},
	starlightexplosion: {
		num: 40011,
		accuracy: 100,
		basePower: 95,
		category: "Special",
		isNonstandard: "Digimon",
		name: "Starlight Explosion",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: {
			chance: 30,
			boosts: {
				spa: -1,
			},
		},
		target: "normal",
		type: "Fairy",
	},
	gigablaster: {
		num: 40012,
		accuracy: 75,
		basePower: 120,
		category: "Physical",
		isNonstandard: "Digimon",
		name: "Giga Blaster",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: null,
		target: "normal",
		type: "Normal",
	},
	forbiddentemptation: {
		num: 40013,
		accuracy: 80,
		basePower: 110,
		category: "Special",
		isNonstandard: "Digimon",
		name: "Forbidden Temptation",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: null,
		target: "normal",
		type: "Grass",
	},
	thornwhip: {
		num: 40014,
		accuracy: 100,
		basePower: 80,
		category: "Physical",
		isNonstandard: "Digimon",
		name: "Thorn Whip",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: {
			chance: 20,
			status: 'par',
		},
		target: "normal",
		type: "Grass",
	},
	sorrowblue: {
		num: 40015,
		accuracy: 100,
		basePower: 90,
		category: "Special",
		isNonstandard: "Digimon",
		name: "Sorrow Blue",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, sound: 1, bypasssub: 1},
		secondary: {
			chance: 10,
			boosts: {
				spd: -1,
			},
		},
		target: "allAdjacent",
		type: "Water",
	},
	sevenheavens: {
		num: 40016,
		accuracy: 95,
		basePower: 15,
		category: "Special",
		isNonstandard: "Digimon",
		name: "Seven Heavens",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		// self: {
		// 	boosts: {
		// 		spa: -2,
		// 	},
		// },
		multihit: 7,
		smartTarget: true,
		secondary: null,
		target: "normal",
		type: "Fairy",
	},
	testament: {
		num: 40017,
		accuracy: 100,
		basePower: 200,
		category: "Physical",
		isNonstandard: "Digimon",
		name: "Testament",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		selfdestruct: "always",
		secondary: null,
		target: "allAdjacent",
		type: "Fairy",
	},
	godflame: {
		num: 40018,
		accuracy: 95,
		basePower: 100,
		category: "Special",
		isNonstandard: "Digimon",
		name: "God Flame",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1, defrost: 1},
		secondary: {
			chance: 50,
			status: 'brn',
		},
		target: "normal",
		type: "Fire",
	},
	holyflame: {
		num: 40019,
		accuracy: 100,
		basePower: 120,
		category: "Physical",
		isNonstandard: "Digimon",
		name: "Holy Flame",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		recoil: [33, 100],
		secondary: null,
		target: "normal",
		type: "Fairy",
	},
	edensjavelin: {
		num: 40020,
		accuracy: 100,
		basePower: 95,
		category: "Physical",
		isNonstandard: "Digimon",
		name: "Eden's Javelin",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: {
			chance: 30,
			boosts: {
				atk: -1,
			},
		},
		target: "normal",
		type: "Fairy",
	},
	sefirotcrystal: {
		num: 40021,
		accuracy: 100,
		basePower: 90,
		category: "Special",
		isNonstandard: "Digimon",
		name: "Sefirot Crystal",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: {
			chance: 10,
			boosts: {
				spd: -1,
			},
		},
		target: "normal",
		type: "Rock",
	},
	trumpsword: {
		num: 40022,
		accuracy: true,
		basePower: 80,
		category: "Physical",
		isNonstandard: "Digimon",
		name: "Trump Sword",
		pp: 20,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onEffectiveness(typeMod, target, type) {
			if (type === 'Steel') return 1;
		},
		target: "normal",
		type: "Steel",
	},
	royalsaber: {
		num: 40023,
		accuracy: 100,
		basePower: 100,
		category: "Physical",
		isNonstandard: "Digimon",
		name: "Royal Saber",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		critRatio: 2,
		secondary: null,
		target: "normal",
		type: "Fairy",
	},
	finalelysion: {
		num: 40024,
		accuracy: 85,
		basePower: 120,
		category: "Special",
		isNonstandard: "Digimon",
		name: "Final Elysion",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		target: "allAdjacentFoes",
		type: "Fairy",
	},
	shininggoldsolarstorm: {
		num: 40025,
		accuracy: 95,
		basePower: 95,
		category: "Special",
		isNonstandard: "Digimon",
		name: "Shining Gold Solar Storm",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: {
			chance: 10,
			status: 'brn',
		},
		target: "allAdjacentFoes",
		type: "Fairy",
	},
	extremejihad: {
		num: 40026,
		accuracy: 90,
		basePower: 140,
		category: "Special",
		isNonstandard: "Digimon",
		name: "Extreme Jihad",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		recoil: [1, 2],
		secondary: null,
		target: "normal",
		type: "Fairy",
	},
	mugen: {
		num: 40027,
		accuracy: 100,
		basePower: 50,
		category: "Special",
		isNonstandard: "Digimon",
		name: "Mugen",
		pp: 20,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: {
			chance: 100,
			boosts: {
				spd: -2,
			},
		},
		target: "allAdjacentFoes",
		type: "Water",
	},
	kouen: {
		num: 40028,
		accuracy: 75,
		basePower: 120,
		category: "Special",
		isNonstandard: "Digimon",
		name: "Kouen",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		volatileStatus: 'partiallytrapped',
		secondary: null,
		target: "normal",
		type: "Fire",
	},
	sourai: {
		num: 40029,
		accuracy: 80,
		basePower: 130,
		category: "Special",
		isNonstandard: "Digimon",
		name: "Sourai",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		// onModifyMove(move, pokemon, target) {
		// 	switch (target?.effectiveWeather()) {
		// 	case 'raindance':
		// 	case 'primordialsea':
		// 		move.accuracy = true;
		// 		break;
		// 	case 'sunnyday':
		// 	case 'desolateland':
		// 		move.accuracy = 50;
		// 		break;
		// 	}
		// },
		secondary: {
			chance: 30,
			status: 'par',
		},
		target: "normal",
		type: "Electric",
	},
	kongou: {
		num: 40030,
		accuracy: 100,
		basePower: 60,
		category: "Special",
		isNonstandard: "Digimon",
		name: "Kongou",
		pp: 20,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: {
			chance: 100,
			boosts: {
				spe: -2,
			},
		},
		target: "normal",
		type: "Steel",
	},
	taikyoku: {
		num: 40031,
		accuracy: true,
		basePower: 100,
		category: "Special",
		isNonstandard: "Digimon",
		name: "Taikyoku",
		pp: 10,
		flags: {protect: 1, mirror: 1},
		onEffectiveness(typeMod, target, type, move) {
			return typeMod + this.dex.getEffectiveness('Dark', type);
		},
		priority: 0,
		onHit() {
			this.add('-clearallboost');
			for (const pokemon of this.getAllActive()) {
				pokemon.clearBoosts();
			}
		},
		secondary: null,
		target: "allAdjacent",
		type: "Fairy",
	},
	oukai: {
		num: 40032,
		accuracy: true,
		basePower: 100,
		category: "Physical",
		isNonstandard: "Digimon",
		name: "Oukai",
		pp: 10,
		flags: {protect: 1, mirror: 1},
		onEffectiveness(typeMod, target, type, move) {
			return typeMod + this.dex.getEffectiveness('Flying', type);
		},
		priority: 0,
		secondary: null,
		self: {
			onHit(source) {
				const weathers = ['sunnyday', 'raindance', 'sandstorm', 'hail'];
				this.field.setWeather(this.sample(weathers));
			},
		},
		target: "allAdjacent",
		type: "Ground",
	},
	amanohabakiri: {
		num: 40033,
		accuracy: 90,
		basePower: 140,
		category: "Physical",
		isNonstandard: "Digimon",
		name: "Ama no Habakiri",
		pp: 5,
		priority: 0,
		flags: {mirror: 1},
		breaksProtect: true,
		onEffectiveness(typeMod, target, type, move) {
			return typeMod + this.dex.getEffectiveness('Light', type);
		},
		self: {
			boosts: {
				spe: -1,
			},
		},
		secondary: null,
		target: "allAdjacentFoes",
		type: "Fire",
	},
	yakusanoikaduchi: {
		num: 40034,
		accuracy: true,
		basePower: 80,
		category: "Special",
		isNonstandard: "Digimon",
		name: "Yakusa no Ikaduchi",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: {
			chance: 80,
			status: 'par',
		},
		target: "allAdjacentFoes",
		type: "Electric",
	},
	// todo: 40035 ʮ��ʿն
	enryugeki: {
		num: 40036,
		accuracy: 100,
		basePower: 100,
		category: "Physical",
		isNonstandard: "Digimon",
		name: "Enryugeki",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		critRatio: 2,
		secondary: null,
		target: "normal",
		type: "Fire",
	},
	kuzuryujin: {
		num: 40037,
		accuracy: 100,
		basePower: 120,
		category: "Special",
		isNonstandard: "Digimon",
		name: "Kuzuryujin",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		// 10% chance to add a 30 bp physical dragon move
		secondary: {
			chance: 10,
			onHit(this, target, source, move) {
				// strange, but yea this is necessary
				if (!move.negateSecondary) {
					this.add('-activate', source, 'move: Kuzuryujin');
					let ninethDragonMove = this.dex.getActiveMove('kuzuryujin');
					ninethDragonMove.accuracy = true;
					ninethDragonMove.basePower = 30;
					ninethDragonMove.category = "Physical";
					ninethDragonMove.flags.contact = 1;
					ninethDragonMove.negateSecondary = true;
					this.actions.runMove(ninethDragonMove, source, source.getLocOf(target), move, undefined, true);
				}
			},
		},
		target: "normal",
		type: "Dragon",
	},
	machinegundestroy: {
		num: 40038,
		accuracy: true,
		basePower: 110,
		category: "Special",
		isNonstandard: "Digimon",
		name: "Machine-Gun Destroy",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		self: {
			boosts: {
				atk: +1,
				def: -1,
			},
		},
		secondary: null,
		target: "normal",
		type: "Steel",
	},
	starlightvelocity: {
		num: 40039,
		accuracy: 100,
		basePower: 80,
		category: "Physical",
		isNonstandard: "Digimon",
		name: "Starlight Velocity",
		pp: 5,
		priority: 2,
		flags: {contact: 1, protect: 1, mirror: 1},
		secondary: null,
		target: "normal",
		type: "Fairy",
	},
	dragonsroar: {
		num: 40040,
		accuracy: 100,
		basePower: 50,
		category: "Special",
		isNonstandard: "Digimon",
		name: "Dragon's Roar",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		// in move type change hard coded in sim/battle-action.ts: hitStepMoveHitLoop
		multihit: 2,
		secondary: null,
		target: "normal",
		type: "Fire",
	},
	breathofwyvern: {
		num: 40041,
		accuracy: 100,
		basePower: 150,
		category: "Special",
		isNonstandard: "Digimon",
		name: "Breath of Wyvern",
		pp: 10,
		priority: -3,
		flags: {protect: 1},
		priorityChargeCallback(pokemon) {
			pokemon.addVolatile('breathofwyvern');
		},
		beforeMoveCallback(pokemon) {
			if (pokemon.volatiles['breathofwyvern']?.lostFocus) {
				this.add('cant', pokemon, 'Breath of Wyvern', 'Breath of Wyvern');
				return true;
			}
		},
		condition: {
			duration: 1,
			onStart(pokemon) {
				this.add('-singleturn', pokemon, 'move: Breath of Wyvern');
			},
			onHit(pokemon, source, move) {
				if (move.category === 'Physical') {
					this.effectState.lostFocus = true;
				}
			},
			onTryAddVolatile(status, pokemon) {
				if (status.id === 'flinch') return null;
			},
		},
		secondary: null,
		target: "allAdjacentFoes",
		type: "Dragon",
	},
	urgentfear: {
		num: 40042,
		accuracy: 100,
		basePower: 50,
		category: "Physical",
		isNonstandard: "Digimon",
		name: "Urgent Fear",
		pp: 25,
		priority: 1,
		flags: {contact: 1, protect: 1, mirror: 1},
		secondary: null,
		target: "normal",
		type: "Fighting",
	},
	spiralmasquerade: {
		num: 40043,
		accuracy: 100,
		basePower: 25,
		category: "Physical",
		isNonstandard: "Digimon",
		name: "Spiral Masquerade",
		pp: 5,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		multihit: [2, 5],
		secondary: null,
		target: "normal",
		type: "Fighting",
	},
	grandcross: {
		num: 40044,
		accuracy: 90,
		basePower: 150,
		category: "Special",
		isNonstandard: "Digimon",
		name: "Grand Cross",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		self: {
			boosts: {
				spa: -2,
			},
		},
		secondary: null,
		target: "allAdjacentFoes",
		type: "Fairy",
	},
	paradiselost: {
		num: 40045,
		accuracy: 100,
		basePower: 130,
		category: "Physical",
		isNonstandard: "Digimon",
		name: "Paradise Lost",
		pp: 5,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		secondary: null,
		target: "normal",
		type: "Fighting",
	},
	deadoralive: {
		num: 40046,
		accuracy: 95,
		basePower: 60,
		category: "Special",
		isNonstandard: "Digimon",
		name: "Dead or Alive",
		pp: 5,
		priority: 0,
		critRatio: 3,
		flags: {protect: 1, mirror: 1},
		// in move type change hard coded in sim/battle-action.ts: hitStepMoveHitLoop
		multihit: 2,
		secondary: null,
		target: "allAdjacentFoes",
		type: "Dark",
	},
	purgatorialflame: {
		num: 40047,
		accuracy: 85,
		basePower: 130,
		category: "Special",
		isNonstandard: "Digimon",
		name: "Purgatorial Flame",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: {
			chance: 20,
			status: 'brn',
		},
		target: "allAdjacent",
		type: "Fire",
	},
	divineatonement: {
		num: 40048,
		accuracy: 90,
		basePower: 150,
		category: "Special",
		isNonstandard: "Digimon",
		name: "Divine Atonement",
		pp: 5,
		priority: 0,
		flags: {recharge: 1, protect: 1, mirror: 1},
		self: {
			volatileStatus: 'mustrecharge',
		},
		secondary: null,
		target: "normal",
		type: "Fairy",
	},
	juuouken: {
		num: 40049,
		accuracy: 100,
		basePower: 85,
		category: "Physical",
		isNonstandard: "Digimon",
		name: "Juuouken",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		ignoreEvasion: true,
		ignoreDefensive: true,
		secondary: null,
		target: "normal",
		type: "Fighting",
	},
};