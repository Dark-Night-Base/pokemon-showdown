export const commands: Chat.ChatCommands = {
	dm: 'digimon',
	digi: 'digimon',
	digimon(target, room, user, connection, cmd) {
		if (!this.runBroadcast()) return;

		const dex = Dex.mod('digimon');

		let buffer = '';

		const targetId = toID(target);
		if (!targetId) return this.parse('/help digimon');
		const targetNum = parseInt(target);
		if (!isNaN(targetNum) && `${targetNum}` === target) {
			if (targetNum <= 40000) return this.parse(`/dt ${targetNum}`);
			for (const pokemon of dex.species.all()) {
				if (pokemon.num === targetNum) {
					target = pokemon.baseSpecies;
					break;
				}
			}
		}

		const newTargets = dex.dataSearch(target);
		if (!newTargets || !newTargets.length) {
			return this.errorReply(`No Digimon, item, move or ability named '${target}' was found. (Check your spelling?)`);
		}
		for (const [i, newTarget] of newTargets.entries()) {
			if (newTarget.isInexact && !i) {
				buffer = `No Digimon, item, move or ability named '${target}' was found. Showing the data of '${newTargets[0].name}' instead.\n`;
			}

			let details: {[k: string]: string} = {};
			switch (newTarget.searchType) {
			case 'pokemon':
				let pokemon = dex.species.get(newTarget.name);
				if (pokemon.num <= 40000) return this.parse(`/dt ${pokemon.id}`);
				buffer += `|raw|${Chat.getDataPokemonHTML(pokemon, dex.gen, String(pokemon.num - 40000))}\n`;
				details = {
					"Dex#": String(pokemon.num - 40000),
				};
				if (!pokemon.evos.length) {
					details[`<font color="#686868">No Pre-Evolution</font>`] = "";
				} else {
					details["Pre-Evolution"] = pokemon.evos.join(", ");
				}
				break;
			case 'item':
				const item = dex.items.get(newTarget.name);
				buffer += `|raw|${Chat.getDataItemHTML(item)}\n`;
				details = {};

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
				if (item.naturalGift) {
					details["Natural Gift Type"] = item.naturalGift.type;
					details["Natural Gift Base Power"] = String(item.naturalGift.basePower);
				}
				if (item.isNonstandard) {
					details[`Unobtainable in Digimon Formats`] = "";
				}
				break;
			case 'move':
				const move = dex.moves.get(newTarget.name);
				if (move.num <= 40000) return this.parse(`/dt ${move.id}`);
				buffer += `|raw|${Chat.getDataMoveHTML(move)}\n`;
				details = {
					Priority: String(move.priority),
				};

				if (move.isNonstandard) details["&#10007; Not exist in Digimon"] = "";
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

				if (move.id === 'snatch') {
					details[`<a href="https://${Config.routes.dex}/tags/nonsnatchable">Non-Snatchable Moves</a>`] = '';
				}
				if (move.id === 'mirrormove') {
					details[`<a href="https://${Config.routes.dex}/tags/nonmirror">Non-Mirrorable Moves</a>`] = '';
				}
				break;
			case 'ability':
				const ability = dex.abilities.get(newTarget.name);
				buffer += `|raw|${Chat.getDataAbilityHTML(ability)}\n`;
				details = {};
				if (ability.isPermanent) details["&#10003; Not affected by Gastro Acid"] = "";
				if (ability.isBreakable) details["&#10003; Ignored by Mold Breaker"] = "";
				break;
			default:
				throw new Error(`Unrecognized searchType`);
			}

			buffer += `|raw|<font size="1">${Object.entries(details).map(([detail, value]) => (
				value === '' ? detail : `<font color="#686868">${detail}:</font> ${value}`
			)).join("&nbsp;|&ThickSpace;")}</font>\n`;
		}
		this.sendReply(buffer);
	},
	datahelp: [
		`/digi [digimon/item/move/ability] - Get details on this digimon/item/move/ability/type.`,
		`!digi [digimon/item/move/ability] - Show everyone these details. Requires: + % @ # &`,
	],
};