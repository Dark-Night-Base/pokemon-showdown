export const Scripts: ModdedBattleScriptsData = {
	gen: 9,
	inherit: 'gen9',
	// Nihilslave: make beak blast / focus punch forte work
	runAction(action: Action) {
		const pokemonOriginalHP = action.pokemon?.hp;
		let residualPokemon: (readonly [Pokemon, number])[] = [];
		// returns whether or not we ended in a callback
		switch (action.choice) {
		case 'start': {
			for (const side of this.sides) {
				if (side.pokemonLeft) side.pokemonLeft = side.pokemon.length;
			}

			this.add('start');

			// Change Zacian/Zamazenta into their Crowned formes
			for (const pokemon of this.getAllPokemon()) {
				let rawSpecies: Species | null = null;
				if (pokemon.species.id === 'zacian' && pokemon.item === 'rustedsword') {
					rawSpecies = this.dex.species.get('Zacian-Crowned');
				} else if (pokemon.species.id === 'zamazenta' && pokemon.item === 'rustedshield') {
					rawSpecies = this.dex.species.get('Zamazenta-Crowned');
				}
				if (!rawSpecies) continue;
				const species = pokemon.setSpecies(rawSpecies);
				if (!species) continue;
				pokemon.baseSpecies = rawSpecies;
				pokemon.details = species.name + (pokemon.level === 100 ? '' : ', L' + pokemon.level) +
					(pokemon.gender === '' ? '' : ', ' + pokemon.gender) + (pokemon.set.shiny ? ', shiny' : '');
				pokemon.setAbility(species.abilities['0'], null, true);
				pokemon.baseAbility = pokemon.ability;

				const behemothMove: {[k: string]: string} = {
					'Zacian-Crowned': 'behemothblade', 'Zamazenta-Crowned': 'behemothbash',
				};
				const ironHead = pokemon.baseMoves.indexOf('ironhead');
				if (ironHead >= 0) {
					const move = this.dex.moves.get(behemothMove[rawSpecies.name]);
					pokemon.baseMoveSlots[ironHead] = {
						move: move.name,
						id: move.id,
						pp: (move.noPPBoosts || move.isZ) ? move.pp : move.pp * 8 / 5,
						maxpp: (move.noPPBoosts || move.isZ) ? move.pp : move.pp * 8 / 5,
						target: move.target,
						disabled: false,
						disabledSource: '',
						used: false,
					};
					pokemon.moveSlots = pokemon.baseMoveSlots.slice();
				}
			}

			if (this.format.onBattleStart) this.format.onBattleStart.call(this);
			for (const rule of this.ruleTable.keys()) {
				if ('+*-!'.includes(rule.charAt(0))) continue;
				const subFormat = this.dex.formats.get(rule);
				if (subFormat.onBattleStart) subFormat.onBattleStart.call(this);
			}

			for (const side of this.sides) {
				for (let i = 0; i < side.active.length; i++) {
					if (!side.pokemonLeft) {
						// forfeited before starting
						side.active[i] = side.pokemon[i];
						side.active[i].fainted = true;
						side.active[i].hp = 0;
					} else {
						this.actions.switchIn(side.pokemon[i], i);
					}
				}
			}
			for (const pokemon of this.getAllPokemon()) {
				this.singleEvent('Start', this.dex.conditions.getByID(pokemon.species.id), pokemon.speciesState, pokemon);
			}
			this.midTurn = true;
			break;
		}

		case 'move':
			if (!action.pokemon.isActive) return false;
			if (action.pokemon.fainted) return false;
			this.actions.runMove(action.move, action.pokemon, action.targetLoc, action.sourceEffect,
				action.zmove, undefined, action.maxMove, action.originalTarget);
			break;
		case 'megaEvo':
			this.actions.runMegaEvo(action.pokemon);
			break;
		case 'runDynamax':
			action.pokemon.addVolatile('dynamax');
			action.pokemon.side.dynamaxUsed = true;
			if (action.pokemon.side.allySide) action.pokemon.side.allySide.dynamaxUsed = true;
			break;
		case 'terastallize':
			this.actions.terastallize(action.pokemon);
			break;
		case 'beforeTurnMove':
			if (!action.pokemon.isActive) return false;
			if (action.pokemon.fainted) return false;
			this.debug('before turn callback: ' + action.move.id);
			const target = this.getTarget(action.pokemon, action.move, action.targetLoc);
			if (!target) return false;
			if (!action.move.beforeTurnCallback) throw new Error(`beforeTurnMove has no beforeTurnCallback`);
			action.move.beforeTurnCallback.call(this, action.pokemon, target);
			break;
		case 'priorityChargeMove':
			if (!action.pokemon.isActive) return false;
			if (action.pokemon.fainted) return false;
			this.debug('priority charge callback: ' + action.move.id);
			// here we change the code
			if (action.move.priorityChargeCallback) action.move.priorityChargeCallback.call(this, action.pokemon);
			// @ts-ignore
			if (action.pokemon.forte.priorityChargeCallback) action.pokemon.forte.priorityChargeCallback.call(this, action.pokemon);
			break;

		case 'event':
			this.runEvent(action.event!, action.pokemon);
			break;
		case 'team':
			if (action.index === 0) {
				action.pokemon.side.pokemon = [];
			}
			action.pokemon.side.pokemon.push(action.pokemon);
			action.pokemon.position = action.index;
			// we return here because the update event would crash since there are no active pokemon yet
			return;

		case 'pass':
			return;
		case 'instaswitch':
		case 'switch':
			if (action.choice === 'switch' && action.pokemon.status) {
				this.singleEvent('CheckShow', this.dex.abilities.getByID('naturalcure' as ID), null, action.pokemon);
			}
			if (this.actions.switchIn(action.target, action.pokemon.position, action.sourceEffect) === 'pursuitfaint') {
				// a pokemon fainted from Pursuit before it could switch
				if (this.gen <= 4) {
					// in gen 2-4, the switch still happens
					this.hint("Previously chosen switches continue in Gen 2-4 after a Pursuit target faints.");
					action.priority = -101;
					this.queue.unshift(action);
					break;
				} else {
					// in gen 5+, the switch is cancelled
					this.hint("A Pokemon can't switch between when it runs out of HP and when it faints");
					break;
				}
			}
			break;
		case 'revivalblessing':
			action.pokemon.side.pokemonLeft++;
			if (action.target.position < action.pokemon.side.active.length) {
				this.queue.addChoice({
					choice: 'instaswitch',
					pokemon: action.target,
					target: action.target,
				});
			}
			action.target.fainted = false;
			action.target.faintQueued = false;
			action.target.subFainted = false;
			action.target.status = '';
			action.target.hp = 1; // Needed so hp functions works
			action.target.sethp(action.target.maxhp / 2);
			this.add('-heal', action.target, action.target.getHealth, '[from] move: Revival Blessing');
			action.pokemon.side.removeSlotCondition(action.pokemon, 'revivalblessing');
			break;
		case 'runUnnerve':
			this.singleEvent('PreStart', action.pokemon.getAbility(), action.pokemon.abilityState, action.pokemon);
			break;
		case 'runSwitch':
			this.actions.runSwitch(action.pokemon);
			break;
		case 'runPrimal':
			if (!action.pokemon.transformed) {
				this.singleEvent('Primal', action.pokemon.getItem(), action.pokemon.itemState, action.pokemon);
			}
			break;
		case 'shift':
			if (!action.pokemon.isActive) return false;
			if (action.pokemon.fainted) return false;
			this.swapPosition(action.pokemon, 1);
			break;

		case 'beforeTurn':
			this.eachEvent('BeforeTurn');
			break;
		case 'residual':
			this.add('');
			this.clearActiveMove(true);
			this.updateSpeed();
			residualPokemon = this.getAllActive().map(pokemon => [pokemon, pokemon.getUndynamaxedHP()] as const);
			this.residualEvent('Residual');
			this.add('upkeep');
			break;
		}

		// phazing (Roar, etc)
		for (const side of this.sides) {
			for (const pokemon of side.active) {
				if (pokemon.forceSwitchFlag) {
					if (pokemon.hp) this.actions.dragIn(pokemon.side, pokemon.position);
					pokemon.forceSwitchFlag = false;
				}
			}
		}

		this.clearActiveMove();

		// fainting

		this.faintMessages();
		if (this.ended) return true;

		// switching (fainted pokemon, U-turn, Baton Pass, etc)

		if (!this.queue.peek() || (this.gen <= 3 && ['move', 'residual'].includes(this.queue.peek()!.choice))) {
			// in gen 3 or earlier, switching in fainted pokemon is done after
			// every move, rather than only at the end of the turn.
			this.checkFainted();
		} else if (action.choice === 'megaEvo' && this.gen === 7) {
			this.eachEvent('Update');
			// In Gen 7, the action order is recalculated for a Pokémon that mega evolves.
			for (const [i, queuedAction] of this.queue.list.entries()) {
				if (queuedAction.pokemon === action.pokemon && queuedAction.choice === 'move') {
					this.queue.list.splice(i, 1);
					queuedAction.mega = 'done';
					this.queue.insertChoice(queuedAction, true);
					break;
				}
			}
			return false;
		} else if (this.queue.peek()?.choice === 'instaswitch') {
			return false;
		}

		if (this.gen >= 5) {
			this.eachEvent('Update');
			for (const [pokemon, originalHP] of residualPokemon) {
				const maxhp = pokemon.getUndynamaxedHP(pokemon.maxhp);
				if (pokemon.hp && pokemon.getUndynamaxedHP() <= maxhp / 2 && originalHP > maxhp / 2) {
					this.runEvent('EmergencyExit', pokemon);
				}
			}
		}

		if (action.choice === 'runSwitch') {
			const pokemon = action.pokemon;
			if (pokemon.hp && pokemon.hp <= pokemon.maxhp / 2 && pokemonOriginalHP! > pokemon.maxhp / 2) {
				this.runEvent('EmergencyExit', pokemon);
			}
		}

		const switches = this.sides.map(
			side => side.active.some(pokemon => pokemon && !!pokemon.switchFlag)
		);

		for (let i = 0; i < this.sides.length; i++) {
			let reviveSwitch = false; // Used to ignore the fake switch for Revival Blessing
			if (switches[i] && !this.canSwitch(this.sides[i])) {
				for (const pokemon of this.sides[i].active) {
					if (this.sides[i].slotConditions[pokemon.position]['revivalblessing']) {
						reviveSwitch = true;
						continue;
					}
					pokemon.switchFlag = false;
				}
				if (!reviveSwitch) switches[i] = false;
			} else if (switches[i]) {
				for (const pokemon of this.sides[i].active) {
					if (pokemon.switchFlag && pokemon.switchFlag !== 'revivalblessing' && !pokemon.skipBeforeSwitchOutEventFlag) {
						this.runEvent('BeforeSwitchOut', pokemon);
						pokemon.skipBeforeSwitchOutEventFlag = true;
						this.faintMessages(); // Pokemon may have fainted in BeforeSwitchOut
						if (this.ended) return true;
						if (pokemon.fainted) {
							switches[i] = this.sides[i].active.some(sidePokemon => sidePokemon && !!sidePokemon.switchFlag);
						}
					}
				}
			}
		}

		for (const playerSwitch of switches) {
			if (playerSwitch) {
				this.makeRequest('switch');
				return true;
			}
		}

		if (this.gen < 5) this.eachEvent('Update');

		if (this.gen >= 8 && (this.queue.peek()?.choice === 'move' || this.queue.peek()?.choice === 'runDynamax')) {
			// In gen 8, speed is updated dynamically so update the queue's speed properties and sort it.
			this.updateSpeed();
			for (const queueAction of this.queue.list) {
				if (queueAction.pokemon) this.getActionSpeed(queueAction);
			}
			this.queue.sort();
		}

		return false;
	},
	queue: {
		resolveAction(action: ActionChoice, midTurn = false): Action[] {
			if (!action) throw new Error(`Action not passed to resolveAction`);
			if (action.choice === 'pass') return [];
			const actions = [action];

			if (!action.side && action.pokemon) action.side = action.pokemon.side;
			if (!action.move && action.moveid) action.move = this.battle.dex.getActiveMove(action.moveid);
			if (!action.order) {
				const orders: {[choice: string]: number} = {
					team: 1,
					start: 2,
					instaswitch: 3,
					beforeTurn: 4,
					beforeTurnMove: 5,
					revivalblessing: 6,

					runUnnerve: 100,
					runSwitch: 101,
					runPrimal: 102,
					switch: 103,
					megaEvo: 104,
					runDynamax: 105,
					terastallize: 106,
					priorityChargeMove: 107,
	
					shift: 200,
					// default is 200 (for moves)

					residual: 300,
				};
				if (action.choice in orders) {
					action.order = orders[action.choice];
				} else {
					action.order = 200;
					if (!['move', 'event'].includes(action.choice)) {
						throw new Error(`Unexpected orderless action ${action.choice}`);
					}
				}
			}
			if (!midTurn) {
				if (action.choice === 'move') {
					if (!action.maxMove && !action.zmove && action.move.beforeTurnCallback) {
						actions.unshift(...this.resolveAction({
							choice: 'beforeTurnMove', pokemon: action.pokemon, move: action.move, targetLoc: action.targetLoc,
						}));
					}
					if (action.mega && !action.pokemon.isSkyDropped()) {
						actions.unshift(...this.resolveAction({
							choice: 'megaEvo',
							pokemon: action.pokemon,
						}));
					}
					if (action.terastallize && !action.pokemon.terastallized) {
						actions.unshift(...this.resolveAction({
							choice: 'terastallize',
							pokemon: action.pokemon,
						}));
					}
					if (action.maxMove && !action.pokemon.volatiles['dynamax']) {
						actions.unshift(...this.resolveAction({
							choice: 'runDynamax',
							pokemon: action.pokemon,
						}));
					}
					// here we change the code
					if (!action.maxMove && !action.zmove &&
						(action.move.priorityChargeCallback ||
							action.pokemon.forte && action.pokemon.forte.priorityChargeCallback)) {
						actions.unshift(...this.resolveAction({
							choice: 'priorityChargeMove',
							pokemon: action.pokemon,
							move: action.move,
						}));
					}
					action.fractionalPriority = this.battle.runEvent('FractionalPriority', action.pokemon, null, action.move, 0);
				} else if (['switch', 'instaswitch'].includes(action.choice)) {
					if (typeof action.pokemon.switchFlag === 'string') {
						action.sourceEffect = this.battle.dex.moves.get(action.pokemon.switchFlag as ID) as any;
					}
					action.pokemon.switchFlag = false;
				}
			}

			const deferPriority = this.battle.gen === 7 && action.mega && action.mega !== 'done';
			if (action.move) {
				let target = null;
				action.move = this.battle.dex.getActiveMove(action.move);

				if (!action.targetLoc) {
					target = this.battle.getRandomTarget(action.pokemon, action.move);
					// TODO: what actually happens here?
					if (target) action.targetLoc = action.pokemon.getLocOf(target);
				}
				action.originalTarget = action.pokemon.getAtLoc(action.targetLoc);
			}
			if (!deferPriority) this.battle.getActionSpeed(action);
			return actions as any;
		},
	},
	// Nihilslave: make self.volatileStatus stack
	actions: {
		runMoveEffects(
			damage: SpreadMoveDamage, targets: SpreadMoveTargets, source: Pokemon,
			move: ActiveMove, moveData: ActiveMove, isSecondary?: boolean, isSelf?: boolean
		) {
			let didAnything: number | boolean | null | undefined = damage.reduce(this.combineResults);
			for (const [i, target] of targets.entries()) {
				if (target === false) continue;
				let hitResult;
				let didSomething: number | boolean | null | undefined = undefined;
	
				if (target) {
					if (moveData.boosts && !target.fainted) {
						hitResult = this.battle.boost(moveData.boosts, target, source, move, isSecondary, isSelf);
						didSomething = this.combineResults(didSomething, hitResult);
					}
					if (moveData.heal && !target.fainted) {
						if (target.hp >= target.maxhp) {
							this.battle.add('-fail', target, 'heal');
							this.battle.attrLastMove('[still]');
							damage[i] = this.combineResults(damage[i], false);
							didAnything = this.combineResults(didAnything, null);
							continue;
						}
						const amount = target.baseMaxhp * moveData.heal[0] / moveData.heal[1];
						const d = target.heal((this.battle.gen < 5 ? Math.floor : Math.round)(amount));
						if (!d && d !== 0) {
							this.battle.add('-fail', source);
							this.battle.attrLastMove('[still]');
							this.battle.debug('heal interrupted');
							damage[i] = this.combineResults(damage[i], false);
							didAnything = this.combineResults(didAnything, null);
							continue;
						}
						this.battle.add('-heal', target, target.getHealth);
						didSomething = true;
					}
					if (moveData.status) {
						hitResult = target.trySetStatus(moveData.status, source, moveData.ability ? moveData.ability : move);
						if (!hitResult && move.status) {
							damage[i] = this.combineResults(damage[i], false);
							didAnything = this.combineResults(didAnything, null);
							continue;
						}
						didSomething = this.combineResults(didSomething, hitResult);
					}
					if (moveData.forceStatus) {
						hitResult = target.setStatus(moveData.forceStatus, source, move);
						didSomething = this.combineResults(didSomething, hitResult);
					}
					if (moveData.volatileStatus) {
						// Nihilslave: code added here
						const vStatus = moveData.volatileStatus.split('+');
						for (const status of vStatus) {
							hitResult = target.addVolatile(status, source, move);
							didSomething = this.combineResults(didSomething, hitResult);
						}
					}
					if (moveData.sideCondition) {
						hitResult = target.side.addSideCondition(moveData.sideCondition, source, move);
						didSomething = this.combineResults(didSomething, hitResult);
					}
					if (moveData.slotCondition) {
						hitResult = target.side.addSlotCondition(target, moveData.slotCondition, source, move);
						didSomething = this.combineResults(didSomething, hitResult);
					}
					if (moveData.weather) {
						hitResult = this.battle.field.setWeather(moveData.weather, source, move);
						didSomething = this.combineResults(didSomething, hitResult);
					}
					if (moveData.terrain) {
						hitResult = this.battle.field.setTerrain(moveData.terrain, source, move);
						didSomething = this.combineResults(didSomething, hitResult);
					}
					if (moveData.pseudoWeather) {
						hitResult = this.battle.field.addPseudoWeather(moveData.pseudoWeather, source, move);
						didSomething = this.combineResults(didSomething, hitResult);
					}
					if (moveData.forceSwitch) {
						hitResult = !!this.battle.canSwitch(target.side);
						didSomething = this.combineResults(didSomething, hitResult);
					}
					// Hit events
					//   These are like the TryHit events, except we don't need a FieldHit event.
					//   Scroll up for the TryHit event documentation, and just ignore the "Try" part. ;)
					if (move.target === 'all' && !isSelf) {
						if (moveData.onHitField) {
							hitResult = this.battle.singleEvent('HitField', moveData, {}, target, source, move);
							didSomething = this.combineResults(didSomething, hitResult);
						}
					} else if ((move.target === 'foeSide' || move.target === 'allySide') && !isSelf) {
						if (moveData.onHitSide) {
							hitResult = this.battle.singleEvent('HitSide', moveData, {}, target.side, source, move);
							didSomething = this.combineResults(didSomething, hitResult);
						}
					} else {
						if (moveData.onHit) {
							hitResult = this.battle.singleEvent('Hit', moveData, {}, target, source, move);
							didSomething = this.combineResults(didSomething, hitResult);
						}
						if (!isSelf && !isSecondary) {
							this.battle.runEvent('Hit', target, source, move);
						}
					}
				}
				if (moveData.selfdestruct === 'ifHit' && damage[i] !== false) {
					this.battle.faint(source, source, move);
				}
				if (moveData.selfSwitch) {
					if (this.battle.canSwitch(source.side)) {
						didSomething = true;
					} else {
						didSomething = this.combineResults(didSomething, false);
					}
				}
				// Move didn't fail because it didn't try to do anything
				if (didSomething === undefined) didSomething = true;
				damage[i] = this.combineResults(damage[i], didSomething === null ? false : didSomething);
				didAnything = this.combineResults(didAnything, didSomething);
			}
	
			if (!didAnything && didAnything !== 0 && !moveData.self && !moveData.selfdestruct) {
				if (!isSelf && !isSecondary) {
					if (didAnything === false) {
						this.battle.add('-fail', source);
						this.battle.attrLastMove('[still]');
					}
				}
				this.battle.debug('move failed because it did nothing');
			} else if (move.selfSwitch && source.hp) {
				source.switchFlag = move.id;
			}
	
			return damage;
		},
	},
	// Nihilslave: show forte in battle like multibility
	pokemon: {
		getItem() {
			const move = this.battle.dex.moves.get(this.item);
			if (!move.exists) return Object.getPrototypeOf(this).getItem.call(this);
			return {...move, ignoreKlutz: true, onTakeItem: false, zMove: undefined};
		},
		hasItem(item) {
			const ownItem = this.item;
			if (this.battle.dex.moves.get(ownItem).exists) return false;
			if (this.ignoringItem()) return false;
			if (!Array.isArray(item)) return ownItem === this.battle.toID(item);
			return item.map(this.battle.toID).includes(ownItem);
		},
		takeItem(source) {
			if (!this.isActive) return false;
			if (!this.item) return false;
			if (this.battle.dex.moves.get(this.item).exists) return false;
			if (!source) source = this;
			const item = this.getItem();
			if (this.battle.runEvent('TakeItem', this, source, null, item)) {
				this.item = '';
				this.itemState = {id: '', target: this};
				this.pendingStaleness = undefined;
				return item;
			}
			return false;
		},
	},
};
