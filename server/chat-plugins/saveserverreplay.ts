import {FS, Utils} from '../../lib';

const path = require('path');
const fs = require('fs');

function escapeHTML(str: string, jsEscapeToo?: boolean) {
	if (typeof str !== 'string') return '';
	str = str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
	if (jsEscapeToo) str = str.replace(/\\/g, '\\\\').replace(/'/g, '\\\'');
	return str;
}

export const commands: Chat.ChatCommands = {
	ssr: 'saveserverreplay',
	// see /test/common.js: saveReplay
	saveserverreplay(target, room) {
		if (!room?.battle) {
			return this.errorReply(this.tr`You can only save replays for battles.`);
		}

		const battleLog = room.getLog(0);
		var filePath = path.resolve(__dirname, `../../replays/${room.roomid}-${room.p1}-${room.p2}.html`);//-${Date.now()}.html`);
		if (room.battle.replaySaved) {
			FS(filePath).unlinkIfExistsSync();
		}
		if (room.hideReplay || room.settings.isPrivate) {
			filePath = path.resolve(__dirname, `../../replays/.${room.roomid}-${room.p1}-${room.p2}.html`);
		}

		const out = fs.createWriteStream(filePath, {flags: 'w'});
		// todo: see client::src/battle-log.ts: createReplayFile
		out.on('open', () => {
			out.write(
				`<!DOCTYPE html>\n` +
				`<meta charset="utf-8" />\n` +
				'<!-- version 1 -->\n' + 
				`<title>${Dex.formats.get(room.battle?.format)} replay: ${room.p1?.name} vs. ${room.p2?.name}</title>\n` + 
				'<style>\n' + 
				'html,body {font-family:Verdana, sans-serif;font-size:10pt;margin:0;padding:0;}body{padding:12px 0;} .battle-log {font-family:Verdana, sans-serif;font-size:10pt;} .battle-log-inline {border:1px solid #AAAAAA;background:#EEF2F5;color:black;max-width:640px;margin:0 auto 80px;padding-bottom:5px;} .battle-log .inner {padding:4px 8px 0px 8px;} .battle-log .inner-preempt {padding:0 8px 4px 8px;} .battle-log .inner-after {margin-top:0.5em;} .battle-log h2 {margin:0.5em -8px;padding:4px 8px;border:1px solid #AAAAAA;background:#E0E7EA;border-left:0;border-right:0;font-family:Verdana, sans-serif;font-size:13pt;} .battle-log .chat {vertical-align:middle;padding:3px 0 3px 0;font-size:8pt;} .battle-log .chat strong {color:#40576A;} .battle-log .chat em {padding:1px 4px 1px 3px;color:#000000;font-style:normal;} .chat.mine {background:rgba(0,0,0,0.05);margin-left:-8px;margin-right:-8px;padding-left:8px;padding-right:8px;} .spoiler {color:#BBBBBB;background:#BBBBBB;padding:0px 3px;} .spoiler:hover, .spoiler:active, .spoiler-shown {color:#000000;background:#E2E2E2;padding:0px 3px;} .spoiler a {color:#BBBBBB;} .spoiler:hover a, .spoiler:active a, .spoiler-shown a {color:#2288CC;} .chat code, .chat .spoiler:hover code, .chat .spoiler:active code, .chat .spoiler-shown code {border:1px solid #C0C0C0;background:#EEEEEE;color:black;padding:0 2px;} .chat .spoiler code {border:1px solid #CCCCCC;background:#CCCCCC;color:#CCCCCC;} .battle-log .rated {padding:3px 4px;} .battle-log .rated strong {color:white;background:#89A;padding:1px 4px;border-radius:4px;} .spacer {margin-top:0.5em;} .message-announce {background:#6688AA;color:white;padding:1px 4px 2px;} .message-announce a, .broadcast-green a, .broadcast-blue a, .broadcast-red a {color:#DDEEFF;} .broadcast-green {background-color:#559955;color:white;padding:2px 4px;} .broadcast-blue {background-color:#6688AA;color:white;padding:2px 4px;} .infobox {border:1px solid #6688AA;padding:2px 4px;} .infobox-limited {max-height:200px;overflow:auto;overflow-x:hidden;} .broadcast-red {background-color:#AA5544;color:white;padding:2px 4px;} .message-learn-canlearn {font-weight:bold;color:#228822;text-decoration:underline;} .message-learn-cannotlearn {font-weight:bold;color:#CC2222;text-decoration:underline;} .message-effect-weak {font-weight:bold;color:#CC2222;} .message-effect-resist {font-weight:bold;color:#6688AA;} .message-effect-immune {font-weight:bold;color:#666666;} .message-learn-list {margin-top:0;margin-bottom:0;} .message-throttle-notice, .message-error {color:#992222;} .message-overflow, .chat small.message-overflow {font-size:0pt;} .message-overflow::before {font-size:9pt;content:\'...\';} .subtle {color:#3A4A66;}\n' + 
				'</style>\n' + 
				'<div class="wrapper replay-wrapper" style="max-width:1180px;margin:0 auto">\n' + 
				`<input type="hidden" name="replayid" value=${room.roomid} />\n` + 
				'<div class="battle"></div><div class="battle-log"></div><div class="replay-controls"></div><div class="replay-controls-2"></div>\n' + 
				`<h1 style="font-weight:normal;text-align:center"><strong>${Dex.formats.get(room.battle?.format)}</strong><br /><a href="http://pokemonshowdown.com/users/${toID(room.p1?.name)}" class="subtle" target="_blank">${room.p1?.name}</a> vs. <a href="http://pokemonshowdown.com/users/${toID(room.p2?.name)}" class="subtle" target="_blank">${room.p2?.name}</a></h1>\n` + 				
				`<script type="text/plain" class="battle-log-data">${battleLog}</script>\n` + 
				'</div>\n' + 
				// @ts-ignore
				// '<div class="battle-log battle-log-inline"><div class="inner">' + room.battle?.scene.log.elem.innerHTML + '</div></div>\n' + 
				// '</div>\n' + 
				'<script>\n' + 
				`let daily = Math.floor(Date.now()/1000/60/60/24);document.write('<script src="https://play.pokemonshowdown.com/js/replay-embed.js?version'+daily+'"></'+'script>');\n` + 
				'</script>\n'
				// `<script src="https://play.pokemonshowdown.com/js/replay-embed.js"></script>\n`
			);
			out.end();
		});

		room.battle.replaySaved = true;

		// this.connection.popup(`Replay saved! TTTEST_`);

		// todo: see client::js/client.js: ReplayUploadedPopup
		if (room.hideReplay || room.settings.isPrivate) {
			// return this.errorReply(this.tr`Your replay has been uploaded! It's available at: http://replay.sciroccogti.top/files/.${room.roomid}-${room.p1}-${room.p2}.html`);
			this.connection.popup(this.tr`Your replay has been uploaded! It's available at: http://replay.sciroccogti.top/files/.${room.roomid}-${room.p1}-${room.p2}.html`);
			return;
		}
		this.connection.popup(this.tr`Your replay has been uploaded! It's available at: http://replay.sciroccogti.top/files/${room.roomid}-${room.p1}-${room.p2}.html`);
		return;
	},
	saveserverreplayhelp: ["/ssr or /saveserverreplay - Save the replay of the battle to server. (We are not a registered server so saving replays to replay.pokemonshowdown.com won't work.)",],
	ssrhelp: ["/ssr or /saveserverreplay - Save the replay of the battle to server. (We are not a registered server so saving replays to replay.pokemonshowdown.com won't work.)",],
}