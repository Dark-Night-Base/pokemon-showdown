export const Scripts: ModdedBattleScriptsData = {
	nextTurn() {
		this.turn++;
		this.lastSuccessfulMoveThisTurn = null;

		const dynamaxEnding: Pokemon[] = [];
		for (const pokemon of this.getAllActive()) {
			if (pokemon.volatiles['dynamax']?.turns === 3) {
				dynamaxEnding.push(pokemon);
			}
		}
		if (dynamaxEnding.length > 1) {
			this.updateSpeed();
			this.speedSort(dynamaxEnding);
		}
		for (const pokemon of dynamaxEnding) {
			pokemon.removeVolatile('dynamax');
		}

		const trappedBySide: boolean[] = [];
		const stalenessBySide: ('internal' | 'external' | undefined)[] = [];
		for (const side of this.sides) {
			let sideTrapped = true;
			let sideStaleness: 'internal' | 'external' | undefined;
			for (const pokemon of side.active) {
				if (!pokemon) continue;

				pokemon.moveThisTurn = '';
				pokemon.newlySwitched = false;
				pokemon.moveLastTurnResult = pokemon.moveThisTurnResult;
				pokemon.moveThisTurnResult = undefined;
				if (this.turn !== 1) {
					pokemon.usedItemThisTurn = false;
					pokemon.statsRaisedThisTurn = false;
					pokemon.statsLoweredThisTurn = false;
					// It shouldn't be possible in a normal battle for a Pokemon to be damaged before turn 1's move selection
					// However, this could be potentially relevant in certain OMs
					pokemon.hurtThisTurn = null;
				}

				pokemon.maybeDisabled = false;
				for (const moveSlot of pokemon.moveSlots) {
					moveSlot.disabled = false;
					moveSlot.disabledSource = '';
				}
				this.runEvent('DisableMove', pokemon);
				if (!pokemon.ateBerry) pokemon.disableMove('belch');
				if (!pokemon.getItem().isBerry) pokemon.disableMove('stuffcheeks');

				// If it was an illusion, it's not any more
				if (pokemon.getLastAttackedBy() && this.gen >= 7) pokemon.knownType = true;

				for (let i = pokemon.attackedBy.length - 1; i >= 0; i--) {
					const attack = pokemon.attackedBy[i];
					if (attack.source.isActive) {
						attack.thisTurn = false;
					} else {
						pokemon.attackedBy.splice(pokemon.attackedBy.indexOf(attack), 1);
					}
				}

				if (this.gen >= 7) {
					// In Gen 7, the real type of every Pokemon is visible to all players via the bottom screen while making choices
					const seenPokemon = pokemon.illusion || pokemon;
					const realTypeString = seenPokemon.getTypes(true).join('/');
					if (realTypeString !== seenPokemon.apparentType) {
						this.add('-start', pokemon, 'typechange', realTypeString, '[silent]');
						seenPokemon.apparentType = realTypeString;
						if (pokemon.addedType) {
							// The typechange message removes the added type, so put it back
							this.add('-start', pokemon, 'typeadd', pokemon.addedType, '[silent]');
						}
					}
				}

				pokemon.trapped = pokemon.maybeTrapped = false;
				this.runEvent('TrapPokemon', pokemon);
				if (!pokemon.knownType || this.dex.getImmunity('trapped', pokemon)) {
					this.runEvent('MaybeTrapPokemon', pokemon);
				}
				// canceling switches would leak information
				// if a foe might have a trapping ability
				if (this.gen > 2) {
					for (const source of pokemon.foes()) {
						const species = (source.illusion || source).species;
						if (!species.abilities) continue;
						for (const abilitySlot in species.abilities) {
							const abilityName = species.abilities[abilitySlot as keyof Species['abilities']];
							if (abilityName === source.ability) {
								// pokemon event was already run above so we don't need
								// to run it again.
								continue;
							}
							const ruleTable = this.ruleTable;
							if ((ruleTable.has('+hackmons') || !ruleTable.has('obtainableabilities')) && !this.format.team) {
								// hackmons format
								continue;
							} else if (abilitySlot === 'H' && species.unreleasedHidden) {
								// unreleased hidden ability
								continue;
							}
							const ability = this.dex.abilities.get(abilityName);
							if (ruleTable.has('-ability:' + ability.id)) continue;
							if (pokemon.knownType && !this.dex.getImmunity('trapped', pokemon)) continue;
							this.singleEvent('FoeMaybeTrapPokemon', ability, {}, pokemon, source);
						}
					}
				}

				if (pokemon.fainted) continue;

				sideTrapped = sideTrapped && pokemon.trapped;
				const staleness = pokemon.volatileStaleness || pokemon.staleness;
				if (staleness) sideStaleness = sideStaleness === 'external' ? sideStaleness : staleness;
				pokemon.activeTurns++;
			}
			trappedBySide.push(sideTrapped);
			stalenessBySide.push(sideStaleness);
			side.faintedLastTurn = side.faintedThisTurn;
			side.faintedThisTurn = null;
		}

		if (this.maybeTriggerEndlessBattleClause(trappedBySide, stalenessBySide)) return;

		if (this.gameType === 'triples' && this.sides.every(side => side.pokemonLeft === 1)) {
			// If both sides have one Pokemon left in triples and they are not adjacent, they are both moved to the center.
			const actives = this.getAllActive();
			if (actives.length > 1 && !actives[0].isAdjacent(actives[1])) {
				this.swapPosition(actives[0], 1, '[silent]');
				this.swapPosition(actives[1], 1, '[silent]');
				this.add('-center');
			}
		}

		this.add('turn', this.turn);

		if (this.gameType === 'multi') {
			for (const side of this.sides) {
				if (side.canDynamaxNow()) {
					if (this.turn === 1) {
						this.addSplit(side.id, ['-candynamax', side.id]);
					} else {
						this.add('-candynamax', side.id);
					}
				}
			}
		}
		if (this.gen === 2) this.quickClawRoll = this.randomChance(60, 256);
		if (this.gen === 3) this.quickClawRoll = this.randomChance(1, 5);

		// Crazyhouse Progress checker because sidebars has trouble keeping track of Pokemon.
		// Please remove me once there is client support.
		if (this.ruleTable.has('crazyhouserule')) {
			for (const side of this.sides) {
				let buf = `raw|${side.name}'s team:<br />`;
				for (const pokemon of side.pokemon) {
					if (!buf.endsWith('<br />')) buf += '/</span>&#8203;';
					if (pokemon.fainted) {
						buf += `<span style="white-space:nowrap;"><span style="opacity:.3"><psicon pokemon="${pokemon.species.id}" /></span>`;
					} else {
						buf += `<span style="white-space:nowrap"><psicon pokemon="${pokemon.species.id}" />`;
					}
				}
				this.add(`${buf}</span>`);
			}
		}

		// #region mirror move
		const p1 = this.getSide('p1').active[0];
		const p2 = this.getSide('p2').active[0];
		if (p1 && p2) {
			const p1Slots = JSON.parse(JSON.stringify(p1.moveSlots));
			const p2Slots = JSON.parse(JSON.stringify(p2.moveSlots));
			while (p1.moveSlots.length > 2) {
				p1.moveSlots.pop();
			}
			while (p2.moveSlots.length > 2) {
				p2.moveSlots.pop();
			}
			for (let i = 0; i < 2; ++i) {
				if (!p2Slots[i]) continue;
				p1.moveSlots.push({
					move: p2Slots[i].move,
					id: p2Slots[i].id,
					pp: p1Slots[i + 2] ? p2Slots[i].maxpp - p1Slots[i + 2].maxpp + p1Slots[i + 2].pp : p2Slots[i].maxpp,
					maxpp: p2Slots[i].maxpp,
					target: p2Slots[i].target,
					disabled: false,
					used: false,
					virtual: true,
				})
			}
			for (let i = 0; i < 2; ++i) {
				if (!p1Slots[i]) continue;
				p2.moveSlots.push({
					move: p1Slots[i].move,
					id: p1Slots[i].id,
					pp: p2Slots[i + 2] ? p1Slots[i].maxpp - p2Slots[i + 2].maxpp + p2Slots[i + 2].pp : p1Slots[i].maxpp,
					maxpp: p1Slots[i].maxpp,
					target: p1Slots[i].target,
					disabled: false,
					used: false,
					virtual: true,
				})
			}
		}
		// #endregion mirror move

		this.makeRequest('move');
	},
};