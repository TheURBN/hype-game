import './assets/app.css';

import voxelEngine from 'voxel-engine';
import voxelDebug from 'voxel-debug';
import player from 'voxel-player';


import controls from './controls.js';
import config from './config/config.js'

const createGame = () => {
	// setup the game and add some trees
	const game = voxelEngine(config);
	const container = document.getElementById('app');
	window.game = game // for debugging
	game.appendTo(container);

	const createPlayer = player(game);

	const avatar = createPlayer();
	avatar.possess();
	avatar.yaw.position.set(2, 50, 4);

	// remove skin, differently it can be done xD
	avatar.playerSkin.playerModel.remove(avatar.playerSkin.upperbody);
	avatar.playerSkin.playerModel.remove(avatar.playerSkin.leftLeg);
	avatar.playerSkin.playerModel.remove(avatar.playerSkin.rightLeg);

	voxelDebug(game);
	controls(game);
}

createGame();
setTimeout(() => game.showAllChunks(), 500);