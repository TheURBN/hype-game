import voxelEngine from 'voxel-engine';
import voxelDebug from 'voxel-debug';

import controls from './controls.js';
import config from 'config/config.js';
import { color } from 'config/voxelStore.js';
import store from 'store';


import loadPrimitives from './primitives';


const initGame = () => {
  const game = voxelEngine(config.game);
  const container = document.getElementById('app');
  loadPrimitives(game);

  window.addEventListener('keydown', function (ev) {
    if (ev.keyCode >= 48 & ev.keyCode <= 57) {
    		user.color = _.toNumber(String.fromCharCode(ev.keyCode)) + 1;
    		console.log('%c user.color ', `background: ${color[user.color - 1]}; color: #fff`);
    };
  });

  store.user.init(game);
  voxelDebug(game).close();
  controls(game, store.user);

  game.appendTo(container);

  return game;
};

export default initGame;