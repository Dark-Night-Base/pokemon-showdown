import {FS} from "../../lib";

export const commands: Chat.ChatCommands = {
	addwarn(target, room, user, connection, cmd) {
		if (user.id !== 'asouchihiro') return this.errorReply('Access Denied by Nihilslave!');
		if (room?.roomid !== 'lobby') return;
		if (!FS(`config/chat-plugins/lobbywarning/old_intro`).existsSync()) {
			FS(`config/chat-plugins/lobbywarning/old_intro`).writeSync(room.settings.introMessage || '');
			return this.parse(`/roomintro ${target}`);
		}
		return this.errorReply('Warning already set. Use /removewarn if you wanna set it again.');
	},
	removewarn(target, room, user, connection, cmd) {
		if (user.id !== 'asouchihiro') return this.errorReply('Access Denied by Nihilslave!');
		if (room?.roomid !== 'lobby') return;
		if (FS(`config/chat-plugins/lobbywarning/old_intro`).existsSync()) {
			const oldIntro = FS(`config/chat-plugins/lobbywarning/old_intro`).readSync();
			FS(`config/chat-plugins/lobbywarning/old_intro`).unlinkIfExistsSync();
			return this.parse(`/roomintro ${oldIntro}`);
		}
	},
	keepwarn(target, room, user, connection, cmd) {
		if (user.id !== 'asouchihiro') return this.errorReply('Access Denied by Nihilslave!');
		if (room?.roomid !== 'lobby') return;
		FS(`config/chat-plugins/lobbywarning/old_intro`).unlinkIfExistsSync();
	},
};
