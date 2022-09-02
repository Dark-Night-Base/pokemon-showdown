export const commands: Chat.ChatCommands = {
	dm: 'digimon',
	digimon(target, room, user, connection, cmd) {
		/*
		if (!this.runBroadcast()) return;

		const dex = Dex.mod('digimon');

		let buffer = '';
		target = targets.join(',');
		const targetId = toID(target);
		if (!targetId) return this.parse('/help data');
		const targetNum = parseInt(target);
		if (!isNaN(targetNum) && `${targetNum}` === target) {
			for (const pokemon of Dex.species.all()) {
				if (pokemon.num === targetNum) {
					target = pokemon.baseSpecies;
					break;
				}
			}
		}
		const newTargets = dex.dataSearch(target);
		const showDetails = (cmd.startsWith('dt') || cmd === 'details');
		if (!newTargets || !newTargets.length) {
			return this.errorReply(`No Pok\u00e9mon, item, move, ability or nature named '${target}' was found${Dex.gen > dex.gen ? ` in Gen ${dex.gen}` : ""}. (Check your spelling?)`);
		}

		for (const [i, newTarget] of newTargets.entries()) {
			if (newTarget.isInexact && !i) {
				buffer = `No Pok\u00e9mon, item, move, ability or nature named '${target}' was found${Dex.gen > dex.gen ? ` in Gen ${dex.gen}` : ""}. Showing the data of '${newTargets[0].name}' instead.\n`;
			}
			let details: {[k: string]: string} = {};
			switch (newTarget.searchType) {
			case 'nature':
				const nature = Dex.natures.get(newTarget.name);
				buffer += `${nature.name} nature: `;
				if (nature.plus) {
					buffer += `+10% ${Dex.stats.names[nature.plus]}, -10% ${Dex.stats.names[nature.minus!]}.`;
				} else {
					buffer += `No effect.`;
				}
				return this.sendReply(buffer);
			case 'pokemon':
				let pokemon = dex.species.get(newTarget.name);
				if (format?.onModifySpecies) {
					pokemon = format.onModifySpecies.call({dex, clampIntRange: Utils.clampIntRange, toID} as Battle, pokemon) || pokemon;
				}
				let tierDisplay = room?.settings.dataCommandTierDisplay;
				if (!tierDisplay && room?.battle) {
					if (room.battle.format.includes('doubles') || room.battle.format.includes('vgc')) {
						tierDisplay = 'doubles tiers';
					} else if (room.battle.format.includes('nationaldex')) {
						tierDisplay = 'numbers';
					}
				}
				if (!tierDisplay) tierDisplay = 'tiers';
				const displayedTier = tierDisplay === 'tiers' ? pokemon.tier :
					tierDisplay === 'doubles tiers' ? pokemon.doublesTier :
					pokemon.num >= 0 ? String(pokemon.num) : pokemon.tier;
				buffer += `|raw|${Chat.getDataPokemonHTML(pokemon, dex.gen, displayedTier)}\n`;
				if (showDetails) {
					let weighthit = 20;
					if (pokemon.weighthg >= 2000) {
						weighthit = 120;
					} else if (pokemon.weighthg >= 1000) {
						weighthit = 100;
					} else if (pokemon.weighthg >= 500) {
						weighthit = 80;
					} else if (pokemon.weighthg >= 250) {
						weighthit = 60;
					} else if (pokemon.weighthg >= 100) {
						weighthit = 40;
					}
					details = {
						"Dex#": String(pokemon.num),
						Gen: String(pokemon.gen) || 'CAP',
						Height: `${pokemon.heightm} m`,
					};
					details["Weight"] = `${pokemon.weighthg / 10} kg <em>(${weighthit} BP)</em>`;
					const gmaxMove = pokemon.canGigantamax || dex.species.get(pokemon.changesFrom).canGigantamax;
					if (gmaxMove && dex.gen >= 8) details["G-Max Move"] = gmaxMove;
					if (pokemon.color && dex.gen >= 5) details["Dex Colour"] = pokemon.color;
					if (pokemon.eggGroups && dex.gen >= 2) details["Egg Group(s)"] = pokemon.eggGroups.join(", ");
					const evos: string[] = [];
					for (const evoName of pokemon.evos) {
						const evo = dex.species.get(evoName);
						if (evo.gen <= dex.gen) {
							const condition = evo.evoCondition ? ` ${evo.evoCondition}` : ``;
							switch (evo.evoType) {
							case 'levelExtra':
								evos.push(`${evo.name} (level-up${condition})`);
								break;
							case 'levelFriendship':
								evos.push(`${evo.name} (level-up with high Friendship${condition})`);
								break;
							case 'levelHold':
								evos.push(`${evo.name} (level-up holding ${evo.evoItem}${condition})`);
								break;
							case 'useItem':
								evos.push(`${evo.name} (${evo.evoItem})`);
								break;
							case 'levelMove':
								evos.push(`${evo.name} (level-up with ${evo.evoMove}${condition})`);
								break;
							case 'other':
								evos.push(`${evo.name} (${evo.evoCondition})`);
								break;
							case 'trade':
								evos.push(`${evo.name} (trade${evo.evoItem ? ` holding ${evo.evoItem}` : condition})`);
								break;
							default:
								evos.push(`${evo.name} (${evo.evoLevel}${condition})`);
							}
						}
					}
					if (!evos.length) {
						details[`<font color="#686868">Does Not Evolve</font>`] = "";
					} else {
						details["Evolution"] = evos.join(", ");
					}
				}
				break;
			case 'item':
				const item = dex.items.get(newTarget.name);
				buffer += `|raw|${Chat.getDataItemHTML(item)}\n`;
				if (showDetails) {
					details = {
						Gen: String(item.gen),
					};

					if (dex.gen >= 4) {
						if (item.fling) {
							details["Fling Base Power"] = String(item.fling.basePower);
							if (item.fling.status) details["Fling Effect"] = item.fling.status;
							if (item.fling.volatileStatus) details["Fling Effect"] = item.fling.volatileStatus;
							if (item.isBerry) details["Fling Effect"] = "Activates the Berry's effect on the target.";
							if (item.id === 'whiteherb') details["Fling Effect"] = "Restores the target's negative stat stages to 0.";
							if (item.id === 'mentalherb') {
								const flingEffect = "Removes the effects of Attract, Disable, Encore, Heal Block, Taunt, and Torment from the target.";
								details["Fling Effect"] = flingEffect;
							}
						} else {
							details["Fling"] = "This item cannot be used with Fling.";
						}
					}
					if (item.naturalGift && dex.gen >= 3) {
						details["Natural Gift Type"] = item.naturalGift.type;
						details["Natural Gift Base Power"] = String(item.naturalGift.basePower);
					}
					if (item.isNonstandard) {
						details[`Unobtainable in Gen ${dex.gen}`] = "";
					}
				}
				break;
			case 'move':
				const move = dex.moves.get(newTarget.name);
				buffer += `|raw|${Chat.getDataMoveHTML(move)}\n`;
				if (showDetails) {
					details = {
						Priority: String(move.priority),
						Gen: String(move.gen) || 'CAP',
					};

					if (move.isNonstandard === "Past" && dex.gen >= 8) details["&#10007; Past Gens Only"] = "";
					if (move.secondary || move.secondaries) details["&#10003; Secondary effect"] = "";
					if (move.flags['contact']) details["&#10003; Contact"] = "";
					if (move.flags['sound']) details["&#10003; Sound"] = "";
					if (move.flags['bullet']) details["&#10003; Bullet"] = "";
					if (move.flags['pulse']) details["&#10003; Pulse"] = "";
					if (!move.flags['protect'] && move.target !== 'self') details["&#10003; Bypasses Protect"] = "";
					if (move.flags['bypasssub']) details["&#10003; Bypasses Substitutes"] = "";
					if (move.flags['defrost']) details["&#10003; Thaws user"] = "";
					if (move.flags['bite']) details["&#10003; Bite"] = "";
					if (move.flags['punch']) details["&#10003; Punch"] = "";
					if (move.flags['powder']) details["&#10003; Powder"] = "";
					if (move.flags['reflectable']) details["&#10003; Bounceable"] = "";
					if (move.flags['charge']) details["&#10003; Two-turn move"] = "";
					if (move.flags['recharge']) details["&#10003; Has recharge turn"] = "";
					if (move.flags['gravity'] && dex.gen >= 4) details["&#10007; Suppressed by Gravity"] = "";
					if (move.flags['dance'] && dex.gen >= 7) details["&#10003; Dance move"] = "";

					if (dex.gen >= 7) {
						if (move.gen >= 8 && move.isMax) {
							// Don't display Z-Power for Max/G-Max moves
						} else if (move.zMove?.basePower) {
							details["Z-Power"] = String(move.zMove.basePower);
						} else if (move.zMove?.effect) {
							const zEffects: {[k: string]: string} = {
								clearnegativeboost: "Restores negative stat stages to 0",
								crit2: "Crit ratio +2",
								heal: "Restores HP 100%",
								curse: "Restores HP 100% if user is Ghost type, otherwise Attack +1",
								redirect: "Redirects opposing attacks to user",
								healreplacement: "Restores replacement's HP 100%",
							};
							details["Z-Effect"] = zEffects[move.zMove.effect];
						} else if (move.zMove?.boost) {
							details["Z-Effect"] = "";
							const boost = move.zMove.boost;
							const stats: {[k in BoostID]: string} = {
								atk: 'Attack', def: 'Defense', spa: 'Sp. Atk', spd: 'Sp. Def', spe: 'Speed', accuracy: 'Accuracy', evasion: 'Evasiveness',
							};
							let h: BoostID;
							for (h in boost) {
								details["Z-Effect"] += ` ${stats[h]} +${boost[h]}`;
							}
						} else if (move.isZ && typeof move.isZ === 'string') {
							details["&#10003; Z-Move"] = "";
							const zCrystal = dex.items.get(move.isZ);
							details["Z-Crystal"] = zCrystal.name;
							if (zCrystal.itemUser) {
								details["User"] = zCrystal.itemUser.join(", ");
								details["Required Move"] = dex.items.get(move.isZ).zMoveFrom!;
							}
						} else {
							details["Z-Effect"] = "None";
						}
					}

					if (dex.gen >= 8) {
						if (move.isMax) {
							details["&#10003; Max Move"] = "";
							if (typeof move.isMax === "string") details["User"] = `${move.isMax}`;
						} else if (move.maxMove?.basePower) {
							details["Dynamax Power"] = String(move.maxMove.basePower);
						}
					}

					const targetTypes: {[k: string]: string} = {
						normal: "One Adjacent Pok\u00e9mon",
						self: "User",
						adjacentAlly: "One Ally",
						adjacentAllyOrSelf: "User or Ally",
						adjacentFoe: "One Adjacent Opposing Pok\u00e9mon",
						allAdjacentFoes: "All Adjacent Opponents",
						foeSide: "Opposing Side",
						allySide: "User's Side",
						allyTeam: "User's Side",
						allAdjacent: "All Adjacent Pok\u00e9mon",
						any: "Any Pok\u00e9mon",
						all: "All Pok\u00e9mon",
						scripted: "Chosen Automatically",
						randomNormal: "Random Adjacent Opposing Pok\u00e9mon",
						allies: "User and Allies",
					};
					details["Target"] = targetTypes[move.target] || "Unknown";

					if (move.id === 'snatch' && dex.gen >= 3) {
						details[`<a href="https://${Config.routes.dex}/tags/nonsnatchable">Non-Snatchable Moves</a>`] = '';
					}
					if (move.id === 'mirrormove') {
						details[`<a href="https://${Config.routes.dex}/tags/nonmirror">Non-Mirrorable Moves</a>`] = '';
					}
					if (move.isNonstandard === 'Unobtainable') {
						details[`Unobtainable in Gen ${dex.gen}`] = "";
					}
				}
				break;
			case 'ability':
				const ability = dex.abilities.get(newTarget.name);
				buffer += `|raw|${Chat.getDataAbilityHTML(ability)}\n`;
				if (showDetails) {
					details = {
						Gen: String(ability.gen) || 'CAP',
					};
					if (ability.isPermanent) details["&#10003; Not affected by Gastro Acid"] = "";
					if (ability.isBreakable) details["&#10003; Ignored by Mold Breaker"] = "";
				}
				break;
			default:
				throw new Error(`Unrecognized searchType`);
			}

			if (showDetails) {
				buffer += `|raw|<font size="1">${Object.entries(details).map(([detail, value]) => (
					value === '' ? detail : `<font color="#686868">${detail}:</font> ${value}`
				)).join("&nbsp;|&ThickSpace;")}</font>\n`;
			}
		}
		this.sendReply(buffer);
		*/
	},
	datahelp: [
		`/data [pokemon/item/move/ability/nature] - Get details on this pokemon/item/move/ability/nature.`,
		`!data [pokemon/item/move/ability/nature] - Show everyone these details. Requires: + % @ # &`,
	],
};