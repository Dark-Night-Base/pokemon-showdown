const child_process = require('child_process');

// debug use
const delay = (ms?: number) => new Promise(res => setTimeout(res, ms));

class AWaitLock {
	lockQueue: any[];
	locked: boolean;
	constructor() {
		this.lockQueue = [];
		this.locked = false;
	}
 
	async lock() {
		if (this.locked) {
			let that = this;
			await new Promise((resolve) => {
				that.lockQueue.push(resolve);
			});
		}
		this.locked = true;
		return true;
	}
 
	unlock() {
		this.locked = false;
		let resolve = this.lockQueue.pop();
		if (resolve) {
			resolve();
		}
	}
}

class remoteSpriteGetter {
	tasks: [string, string][] = [];
	tasks_Lock: AWaitLock = new AWaitLock();
	constructor() {}
	async get(t: [string, string][]) {
		for (const task of t) {
			child_process.execSync(`python3 getRemoteIFSprite.py ${task[0]} ${task[1]}`,
				{cwd: '/home/mc/pokemon-showdown-client/sprites'}
			);
		}
	}
	async push(head: string, body: string) {
		await this.tasks_Lock.lock();
		this.tasks.push([head, body]);
		if (this.tasks.length >= 6) {
			const t = this.tasks.slice();
			this.tasks = [];
			this.get(t);
		}
		this.tasks_Lock.unlock();
	}
}

const getter = new remoteSpriteGetter();

export const commands: Chat.ChatCommands = {
	// this should not be async, will be laggy in that case
	ifget(target, room, user, connection) {
		if (!target) return;
		const args = target.split('.');
		if (args.length !== 2) return;
		const head = Number(args[0]);
		const body = Number(args[1]);
		if (isNaN(head) || isNaN(body)) return;
		if (head > 890 || head < 1 || head === 848) return;
		if (body > 890 || body < 1 || body === 848) return;
		return getter.push(args[0], args[1]);
	},
	ifinfo(target, room, user, connection) {
		this.sendReplyBox(`${getter.tasks.length} spriteids in queue: ${getter.tasks.join('; ')}`);
	},
};
