import _ from 'lodash';
import store from '../store/gameStore.js';

import Sky from './sky.js';
import Light from './light.js';
import Cube from './cube.js';
import Floor from './floor.js';


const loadPrimitives = (game) => {
  game.primitives = {};

  Sky(game);
  // Light(game);
  // Cube(game);
  Floor(game);
  // Flag(game);

  game.render();
  // mobx.autorun(() => {
  //   _.forEach(store.flags, (val) => {
  //     const flag = new Flag(game, { x: val.x, y: val.y, z: val.z });
  //     window.flag = flag;
  //   });
  // });

  return game.primitives;
};


export default loadPrimitives;