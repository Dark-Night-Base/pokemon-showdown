// https://mathjs.org/index.html

import {create, all} from 'mathjs';

const config = {
	epsilon: 1e-12,
	matrix: 'Matrix',
	number: 'BigNumber',
	precision: 64,
	predictable: false,
	randomSeed: null,
};

const math = create(all, config as any);

export const commands: Chat.ChatCommands = {
	invmod(target, room, user, connection, cmd) {
		if (!target) return;
		if (!user.isStaff) return; // remove this line after bug fixed
		const numbers = target.split(',');
		if (numbers.length !== 2) return;
		const a = math.bignumber(numbers[0]);
		const b = math.bignumber(numbers[1]);
		// ehh, where's the invmod the doc says?
		const results = math.xgcd(a, b);
		// todo: figure out why it crashes and catch every error
		this.sendReply(results[1].toString());
	}
};
