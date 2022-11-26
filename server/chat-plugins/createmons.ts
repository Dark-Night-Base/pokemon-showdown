export const commands: Chat.ChatCommands = {
	ctm(target, room, user, connection) {
		if (Monitor.countPrepBattle(connection.ip, connection)) {
			return;
		}
		if (!target) return this.errorReply(this.tr`Provide a valid slot.`);
		const slot = Number(target);
		if (isNaN(slot)) return this.errorReply(this.tr`Provide a valid slot.`);
		const format = Dex.formats.get('gen9balancedcreatemons');
		const newTeam = user.battleSettings.team.split(']')[slot];

		return TeamValidatorAsync.get(format.id).validateTeam(newTeam).then(result => {
			connection.popup(`${result.slice(1).replace(/\n/g, '\n- ')}`);
		});
	},
	ctmhelp: [`/ctm [format] - Validates your current Createmons set (set with /utm).`],
}