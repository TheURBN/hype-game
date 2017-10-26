import voxelEngine from 'voxel-engine';

import config from 'config/config.js';
import color from 'config/materials.js';
import controlInit from './controls.js';
import store from 'store';


import loadPrimitives from './primitives';


const initGame = () => {
  const game = voxelEngine(config.game);
  const container = document.getElementById('game');
  game.paused = false;

  loadPrimitives(game);
  store.user.init(game);

  controlInit(game, store.user);

  game.appendTo(container);
  setTimeout(() => game.showAllChunks(), 500);

  return game;
};

export default initGame;