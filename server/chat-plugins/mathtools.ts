// https://mathjs.org/index.html

const math = require('mathjs');

function toPRNGSeed(a: any) {
	return a;
}

export const commands: Chat.ChatCommands = {
	invmod(target, room, user, connection, cmd) {
		if (!target) return;
		if (!user.isStaff) return; // remove this line after bug fixed
		const numbers = target.split(',');
		if (numbers.length !== 2) return;
		try {
			const a = math.bignumber(numbers[0]);
			const b = math.bignumber(numbers[1]);
			const result = math.invmod(a, b);
			this.sendReplyBox(`invmod: ${result.toHex().toUpperCase()}`);
		} catch (e) {
			this.errorReply('invmod error!');
		}
	}
};
