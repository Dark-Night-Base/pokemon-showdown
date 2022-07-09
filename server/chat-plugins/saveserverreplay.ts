import {FS, Utils} from '../../lib';

const path = require('path');
const fs = require('fs');

export const commands: Chat.ChatCommands = {
	ssr: 'saveserverreplay',
	// function saveReplay in /test/common.js
	saveserverreplay(target, room) {
		if (!room?.battle) {
			return this.errorReply(this.tr`You can only save replays for battles.`);
		}

		const battleLog = room.getLog(0);
		var filePath = path.resolve(__dirname, `../../replays/${room.roomid}-${room.p1}-${room.p2}.html`);//-${Date.now()}.html`);
		if (room.battle.replaySaved && room.hideReplay) {
			FS(filePath).unlinkIfExistsSync();
			filePath = path.resolve(__dirname, `../../replays/.${room.roomid}-${room.p1}-${room.p2}.html`);
		}
		const out = fs.createWriteStream(filePath, {flags: 'w'});
		out.on('open', () => {
			out.write(
				`<!DOCTYPE html>\n` +
				`<meta charset="utf-8" />\n` +
				`<script type="text/plain" class="battle-log-data">${battleLog}</script>\n` +
				`<script src="https://play.pokemonshowdown.com/js/replay-embed.js"></script>\n`
			);
			out.end();
		});
		room.battle.replaySaved = true;
		return this.errorReply(this.tr`Your replay has been uploaded! It's available at: http://replay.sciroccogti.top/files/${room.roomid}-${room.p1}-${room.p2}.html`);
	},
	saveserverreplayhelp: ["/ssr or /saveserverreplay - Save the replay of the battle to server. (We are not a registered server so saving replays to replay.pokemonshowdown.com won't work.)",],
	ssrhelp: ["/ssr or /saveserverreplay - Save the replay of the battle to server. (We are not a registered server so saving replays to replay.pokemonshowdown.com won't work.)",],
}