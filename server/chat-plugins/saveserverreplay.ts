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

		const format = Dex.formats.get(room.battle.format, true);
		let hideDetails = !format.id.includes('customgame');
		if (format.team && room.battle.ended) hideDetails = false;
		const data = room.getLog(hideDetails ? 0 : -1);
		const {id, password} = room.getReplayData();
		let link = room.roomid.slice(7) + '-' + room.p1 + '-' + room.p2 + '.html';
		let rating = 0;
		if (room.battle.ended && room.battle.rated) rating = room.battle.rated;
		let secret = room.settings.isPrivate || room.hideReplay;

		var filePath = path.resolve(__dirname, `../../replays/${link}`);
		if (room.battle.replaySaved) {
			FS(filePath).unlinkIfExistsSync();
		}
		if (secret || target === 'silent') {
			link = '.' + link;
			filePath = path.resolve(__dirname, `../../replays/${link}`);
		}

		const out = fs.createWriteStream(filePath, {flags: 'w'});
		// see client::src/battle-log.ts: createReplayFile
		out.on('open', () => {
			out.write(
				`<!DOCTYPE html>\n` +
				`<meta charset="utf-8" />\n` +
				`<title>${format} replay: ${room.p1?.name} vs. ${room.p2?.name}</title>\n` + 
				`<meta name="description" content="Watch a replay of a Pokémon battle between ${room.p1?.name} and ${room.p2?.name} (${format})" />` +
				'<style>\n' + 
				'html,body {font-family:Verdana, sans-serif;font-size:10pt;margin:0;padding:0;}body{padding:12px 0;} .battle-log {font-family:Verdana, sans-serif;font-size:10pt;} .battle-log-inline {border:1px solid #AAAAAA;background:#EEF2F5;color:black;max-width:640px;margin:0 auto 80px;padding-bottom:5px;} .battle-log .inner {padding:4px 8px 0px 8px;} .battle-log .inner-preempt {padding:0 8px 4px 8px;} .battle-log .inner-after {margin-top:0.5em;} .battle-log h2 {margin:0.5em -8px;padding:4px 8px;border:1px solid #AAAAAA;background:#E0E7EA;border-left:0;border-right:0;font-family:Verdana, sans-serif;font-size:13pt;} .battle-log .chat {vertical-align:middle;padding:3px 0 3px 0;font-size:8pt;} .battle-log .chat strong {color:#40576A;} .battle-log .chat em {padding:1px 4px 1px 3px;color:#000000;font-style:normal;} .chat.mine {background:rgba(0,0,0,0.05);margin-left:-8px;margin-right:-8px;padding-left:8px;padding-right:8px;} .spoiler {color:#BBBBBB;background:#BBBBBB;padding:0px 3px;} .spoiler:hover, .spoiler:active, .spoiler-shown {color:#000000;background:#E2E2E2;padding:0px 3px;} .spoiler a {color:#BBBBBB;} .spoiler:hover a, .spoiler:active a, .spoiler-shown a {color:#2288CC;} .chat code, .chat .spoiler:hover code, .chat .spoiler:active code, .chat .spoiler-shown code {border:1px solid #C0C0C0;background:#EEEEEE;color:black;padding:0 2px;} .chat .spoiler code {border:1px solid #CCCCCC;background:#CCCCCC;color:#CCCCCC;} .battle-log .rated {padding:3px 4px;} .battle-log .rated strong {color:white;background:#89A;padding:1px 4px;border-radius:4px;} .spacer {margin-top:0.5em;} .message-announce {background:#6688AA;color:white;padding:1px 4px 2px;} .message-announce a, .broadcast-green a, .broadcast-blue a, .broadcast-red a {color:#DDEEFF;} .broadcast-green {background-color:#559955;color:white;padding:2px 4px;} .broadcast-blue {background-color:#6688AA;color:white;padding:2px 4px;} .infobox {border:1px solid #6688AA;padding:2px 4px;} .infobox-limited {max-height:200px;overflow:auto;overflow-x:hidden;} .broadcast-red {background-color:#AA5544;color:white;padding:2px 4px;} .message-learn-canlearn {font-weight:bold;color:#228822;text-decoration:underline;} .message-learn-cannotlearn {font-weight:bold;color:#CC2222;text-decoration:underline;} .message-effect-weak {font-weight:bold;color:#CC2222;} .message-effect-resist {font-weight:bold;color:#6688AA;} .message-effect-immune {font-weight:bold;color:#666666;} .message-learn-list {margin-top:0;margin-bottom:0;} .message-throttle-notice, .message-error {color:#992222;} .message-overflow, .chat small.message-overflow {font-size:0pt;} .message-overflow::before {font-size:9pt;content:\'...\';} .subtle {color:#3A4A66;}\n' + 
				'</style>\n' + 
				'<div class="wrapper replay-wrapper" style="max-width:1180px;margin:0 auto">\n' + 
				`<input type="hidden" name="replayid" value="${id}" />\n` + 
				'<div class="battle"></div><div class="battle-log"></div><div class="replay-controls"></div><div class="replay-controls-2"></div>\n' + 
				`<pre class="urlbox" style="word-wrap: break-word;">http://replay.sciroccogti.top/files/${link}</pre>\n` +
				`<h1 style="font-weight:normal;text-align:left"><strong>${format}</strong>: <a href="http://pokemonshowdown.com/users/${toID(room.p1?.name)}" class="subtle" target="_blank">${room.p1?.name}</a> vs. <a href="http://pokemonshowdown.com/users/${toID(room.p2?.name)}" class="subtle" target="_blank">${room.p2?.name}</a></h1>\n` + 				
				'<p style="padding:0 1em;margin-top:0">' +
				`<small class="uploaddate" data-timestamp="${Date.now() / 1000}"><em>Uploaded:</em> ${new Date().toDateString().split(" ")[1]} ${new Date().toDateString().split(" ")[2]}, ${new Date().getFullYear()} ${rating ? '| <em>Rating:</em>' + rating : ''}</small>` +
				'</p>' +
				`<script type="text/plain" class="battle-log-data">${data}</script>\n` + 
				'</div>\n' + 

				// @ts-ignore
				// '<div class="battle-log battle-log-inline"><div class="inner">' + room.battle?.scene.log.elem.innerHTML + '</div></div>\n' + 
				// '</div>\n' + 

				'<script>\n' + 
				`let daily = Math.floor(Date.now()/1000/60/60/24);document.write('<script src="http://psc.sciroccogti.top/js/replay-embed.js?version'+daily+'"></'+'script>');\n` + 
				'</script>\n'

				// '<script src="http://replay.sciroccogti.top/js/replay-embed.js"></script>'

				// `<script src="https://play.pokemonshowdown.com/js/replay-embed.js"></script>\n`
			);
			out.end();
		});
		
		// #region onlineReplay
		// tried to keep up with replay.pokemonshowdown.com but failed.
		// out.on('open', () => {
		// 	out.write(
		// 		`<!DOCTYPE html>\n` +
		// 		`<html><head>\n` +
		// 		`<meta charset="utf-8" />\n` +
		// 		`<title>${Dex.formats.get(room.battle?.format)} replay: ${room.p1?.name} vs. ${room.p2?.name}</title>\n` +
		// 		`<meta name="description" content="Watch a replay of a Pokémon battle between ${room.p1?.name} and ${room.p2?.name} (${Dex.formats.get(room.battle?.format)})" />` +
		// 		'<meta http-equiv="X-UA-Compatible" content="IE=Edge,chrome=IE8" />\n' +
		// 		'<link rel="stylesheet" href="https://play.pokemonshowdown.com/style/font-awesome.css?932f42c7" />\n' +
		// 		'<link rel="stylesheet" href="https://pokemonshowdown.com/theme/panels.css?0.8626627733285226" />\n' +
		// 		'<link rel="stylesheet" href="https://pokemonshowdown.com/theme/main.css?0.9739025453096699" />\n' +
		// 		'<link rel="stylesheet" href="https://play.pokemonshowdown.com/style/battle.css?8e37a9fd" />\n' +
		// 		'<link rel="stylesheet" href="https://play.pokemonshowdown.com/style/replay.css?cfa51183" />\n' +
		// 		'<link rel="stylesheet" href="https://play.pokemonshowdown.com/style/utilichart.css?e39c48cf" />\n' +
		// 		'<!-- Workarounds for IE bugs to display trees correctly. -->\n' +
		// 		'<!--[if lte IE 6]><style> li.tree { height: 1px; } </style><![endif]-->\n' +
		// 		'<!--[if IE 7]><style> li.tree { zoom: 1; } </style><![endif]-->\n' +
		// 		// '<script type="text/javascript">\n' +
		// 		// 'var _gaq = _gaq || [];\n' +
		// 		// '_gaq.push([\'_setAccount\', \'UA-26211653-1\']);\n' +
		// 		// '_gaq.push([\'_setDomainName\', \'pokemonshowdown.com\']);\n' +
		// 		// '_gaq.push([\'_setAllowLinker\', true]);\n' +
		// 		// '_gaq.push([\'_trackPageview\']);\n' +
		// 		// '(function() {\n' +
		// 		// 'var ga = document.createElement(\'script\'); ga.type = \'text/javascript\'; ga.async = true;\n' +
		// 		// 'ga.src = (\'https:\' == document.location.protocol ? \'https://ssl\' : \'http://www\') + \'.google-analytics.com/ga.js\';\n' +
		// 		// 'var s = document.getElementsByTagName(\'script\')[0]; s.parentNode.insertBefore(ga, s);\n' +
		// 		// '})();\n' +
		// 		// '</script>\n' +
		// 		'</head><body>\n' +
		// 		'<div class="pfx-panel"><div class="pfx-body" style="max-width:1180px; margin:0 auto">\n' +
		// 		'<div class="wrapper replay-wrapper">\n' +
		// 		'<div class="battle"><div class="playbutton"><button disabled>Loading...</button></div></div>\n' +
		// 		'<div class="battle-log"></div>\n' +
		// 		'<div class="replay-controls">\n' +
		// 		'<button data-action="start"><i class="fa fa-play"></i> Play</button>\n' +
		// 		'</div>\n' +
		// 		'<div class="replay-controls-2">\n' +
		// 		'<div class="chooser leftchooser speedchooser">\n' +
		// 		'<em>Speed:</em>\n' +
		// 		'<div><button value="hyperfast">Hyperfast</button> <button value="fast">Fast</button><button value="normal" class="sel">Normal</button><button value="slow">Slow</button><button value="reallyslow">Really Slow</button></div>\n' +
		// 		'</div>\n' +
		// 		'<div class="chooser colorchooser">\n' +
		// 		'<em>Color&nbsp;scheme:</em>\n' +
		// 		'<div><button class="sel" value="light">Light</button><button value="dark">Dark</button></div>\n' +
		// 		'</div>\n' +
		// 		'<div class="chooser soundchooser" style="display:none">\n' +
		// 		'<em>Music:</em>\n' +
		// 		'<div><button class="sel" value="on">On</button><button value="off">Off</button></div>\n' +
		// 		'</div>\n' +
		// 		'</div>\n' +
		// 		`<pre class="urlbox" style="word-wrap: break-word;">http://replay.sciroccogti.top/files/${(room.hideReplay || room.settings.isPrivate) ? '.' : ''}${room.roomid}-${room.p1}-${room.p2}.html</pre>\n` +
		// 		`<h1 style="font-weight:normal;text-align:left"><strong>${Dex.formats.get(room.battle?.format)}</strong>: <a href="http://pokemonshowdown.com/users/${toID(room.p1?.name)}" class="subtle" target="_blank">${room.p1?.name}</a> vs. <a href="http://pokemonshowdown.com/users/${toID(room.p2?.name)}" class="subtle" target="_blank">${room.p2?.name}</a></h1>\n` +
		// 		'</div>\n' + 
		// 		`<input type="hidden" name="replayid" value=${room.roomid} />\n` + 
		// 		`<script type="text/plain" class="battle-log-data">${battleLog}</script>\n` + 
		// 		'</div></div>\n' +
		// 		'<script src="https://play.pokemonshowdown.com/js/lib/ps-polyfill.js"></script>\n' +
		// 		'<script src="https://play.pokemonshowdown.com/js/lib/jquery-1.11.0.min.js?8fc25e27"></script><script src="https://play.pokemonshowdown.com/js/lib/lodash.core.js?e9be4c2d"></script><script src="https://play.pokemonshowdown.com/js/lib/backbone.js?8a8d8296"></script><script src="https://dex.pokemonshowdown.com/js/panels.js?0.7863498086865959"></script><script src="https://play.pokemonshowdown.com/js/lib/jquery-cookie.js?38477214"></script><script src="https://play.pokemonshowdown.com/js/lib/html-sanitizer-minified.js?949c4200"></script><script src="https://play.pokemonshowdown.com/js/battle-sound.js?8e5efe0f"></script><script src="https://play.pokemonshowdown.com/config/config.js?f08e9e6a"></script><script src="https://play.pokemonshowdown.com/js/battledata.js?d018770b"></script><script src="https://play.pokemonshowdown.com/data/pokedex-mini.js?73389fb3"></script><script src="https://play.pokemonshowdown.com/data/pokedex-mini-bw.js?59d44f9f"></script><script src="https://play.pokemonshowdown.com/data/graphics.js?e46d22dd"></script><script src="https://play.pokemonshowdown.com/data/pokedex.js?eea8e9ec"></script><script src="https://play.pokemonshowdown.com/data/items.js?1f7a39fb"></script><script src="https://play.pokemonshowdown.com/data/moves.js?a0b53a8e"></script><script src="https://play.pokemonshowdown.com/data/abilities.js?96703c4e"></script><script src="https://play.pokemonshowdown.com/data/teambuilder-tables.js?160c1b1a"></script><script src="https://play.pokemonshowdown.com/js/battle-tooltips.js?c309b930"></script><script src="https://play.pokemonshowdown.com/js/battle.js?d4ed5cb9"></script><script src="/js/replay.js"></script>\n' +
		// 		'</body></html>'
		// 	);
		// 	out.end();
		// });
		// #endregion

		room.battle.replaySaved = true;

		// this.connection.popup(`Replay saved! TTTEST_`);
		if (target !== 'silent') {
			this.connection.popup(this.tr`Your replay has been uploaded! It's available at: http://replay.sciroccogti.top/files/${link}`);

			this.connection.send('|queryresponse|savereplay|' + JSON.stringify({
				// log: data,
				// id: id,
				// password: password,
				uri: link,
				silent: true, // to avoid the official client popup
				// hidden: secret,
			}));
		}
	},
	saveserverreplayhelp: ["/ssr or /saveserverreplay - Save the replay of the battle to server. (We are not a registered server so saving replays to replay.pokemonshowdown.com won't work.)",],
	ssrhelp: ["/ssr or /saveserverreplay - Save the replay of the battle to server. (We are not a registered server so saving replays to replay.pokemonshowdown.com won't work.)",],
}