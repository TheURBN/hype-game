import './assets/app.scss';

import voxelEngine from 'voxel-engine';
import voxelDebug from 'voxel-debug';
import User from './user.js';
import socket from './socket.js';
import _ from 'lodash';
import { color } from 'config/voxelStore.js';


import controls from './controls.js';
import config from 'config/config.js';

let user;

const createGame = () => {
	const game = voxelEngine(config);
	const container = document.getElementById('app');
	game.appendTo(container);
	window.game = game; // for debugging

	user = new User(game, 2, 7);
	// debug 
  window.addEventListener('keydown', function (ev) {
    if (ev.keyCode > 48 & ev.keyCode < 57) {
			user.color = _.toNumber(ev.keyCode.toString().charAt(1));
			console.log('%c user.color ', `background: ${color[user.color]}; color: #fff`);
		};
  })

	voxelDebug(game).close();
	controls(game, user);

	return game;
}

export default createGame;
export { user };
