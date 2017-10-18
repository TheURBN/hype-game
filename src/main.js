import './assets/app.scss';

import voxelEngine from 'voxel-engine';
import voxelDebug from 'voxel-debug';
import voxelSky from 'voxel-sky';


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
	const THREE = game.THREE;

	var skyGeo = new THREE.SphereGeometry(100, 15, 15);
	var sky = new THREE.Mesh(skyGeo, material);
	const texture = new THREE.TextureLoader().load("dist/textures/space.jpg");
	const material = new THREE.MeshPhongMaterial({ 
		map: texture,
	});

	sky.material.side = THREE.BackSide;
	sky.position.set(500, 10, 500);
	game.addItem({ mesh: sky });
	
	// debug 
  window.addEventListener('keydown', function (ev) {
    if (ev.keyCode >= 48 & ev.keyCode <= 57) {
    		user.color = _.toNumber(String.fromCharCode(ev.keyCode)) + 1;
    		console.log('%c user.color ', `background: ${color[user.color - 1]}; color: #fff`);
    };
 	});

	voxelDebug(game).close();
	controls(game, user);

	return game;
}

export default createGame;
export { user };
