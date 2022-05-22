import {Utils} from '../../lib';

const path = require('path');
const fs = require('fs');

export const commands: Chat.ChatCommands = {
	ssr: 'saveserverreplay',
	saveserverreplay(target, room) {
		// function saveReplay in /test/common.js
		if (!room) {
			return;
		}
		if (room.type == 'battle') {
			const battleLog = room.getLog(0);
			const filePath = path.resolve(__dirname, `../../replays/${room.roomid}.html`);//-${Date.now()}.html`);
			const out = fs.createWriteStream(filePath, {flags: 'a'});
			out.on('open', () => {
				out.write(
					`<!DOCTYPE html>\n` +
					`<script type="text/plain" class="battle-log-data">${battleLog}</script>\n` +
					`<script src="https://play.pokemonshowdown.com/js/replay-embed.js"></script>\n`
				);
				out.end();
			});
		}
	},
	saveserverreplayhelp: ["/ssr or /saveserverreplay - Save the replay of the battle to server. (We are not a registered server so saving replays to replay.pokemonshowdown.com won't work.)",],
	ssrhelp: ["/ssr or /saveserverreplay - Save the replay of the battle to server. (We are not a registered server so saving replays to replay.pokemonshowdown.com won't work.)",],
}