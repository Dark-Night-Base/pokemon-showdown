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
	stopFlag: boolean = false;
	constructor() {
		this.start();
	}
	async start() {
		this.stopFlag = false;
		while (this.stopFlag === false) {
			if (this.tasks[0]) {
				await this.tasks_Lock.lock();
				child_process.execSync(`python3 getRemoteIFSprite.py ${this.tasks[0][0]} ${this.tasks[0][1]}`,
					{cwd: '/home/mc/pokemon-showdown-client/sprites'}
				);
				this.tasks = this.tasks.slice(1);
				this.tasks_Lock.unlock();
			}
		}
	}
	stop() {
		this.stopFlag = true;
	}
	async push(head: string, body: string) {
		await this.tasks_Lock.lock();
		this.tasks.push([head, body]);
		this.tasks_Lock.unlock();
	}
}

const getter = new remoteSpriteGetter();

export const commands: Chat.ChatCommands = {
	ifget(target, room, user, connection) {
		if (!target) return;
		const args = target.split('.');
		if (args.length !== 2) return;
		const head = Number(args[0]);
		const body = Number(args[1]);
		if (isNaN(head) || isNaN(body)) return;
		if (head > 890 || head < 1 || head === 848) return;
		if (body > 890 || body < 1 || body === 848) return;
		if (getter.stopFlag) getter.start();
		getter.push(args[0], args[1]);
	},
	ifstop(target, room, user, connection) {
		if (getter) getter.stop();
	},
};
