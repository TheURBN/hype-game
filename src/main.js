import './assets/app.css';

import voxelEngine from 'voxel-engine';
import voxelDebug from 'voxel-debug';
import User from './user.js'


import controls from './controls.js';
import config from './config/config.js'


const createGame = () => {
	const game = voxelEngine(config);
	const container = document.getElementById('app');
	game.appendTo(container);
	window.game = game; // for debugging

	const user = new User(game, 2, 2);

	voxelDebug(game);
	controls(game, user);

	return game;
}

createGame();
setTimeout(() => game.showAllChunks(), 500);