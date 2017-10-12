import './assets/app.css';

import voxelEngine from 'voxel-engine';
import voxelDebug from 'voxel-debug';
import User from './user.js';
import socket from './socket.js';
import _ from 'lodash';


import controls from './controls.js';
import config from 'config/config.js';


const createGame = () => {
	const game = voxelEngine(config);
	const container = document.getElementById('app');
	game.appendTo(container);
	window.game = game; // for debugging

	const user = new User(game, 2, 3);

	voxelDebug(game);
	controls(game, user);

	return game;
}


export default createGame;