import Sky from './sky.js';
import Light from './light.js';
import Cube from './cube.js';
import Floor from './floor.js';


const loadPrimitives = (game) => {
  game.primitives = {};
  game.scene.background = new game.THREE.Color(0x000000);

  Sky(game);
  // Light(game);
  Cube(game);
  // Floor(game);

  game.render();

  return game.primitives;
};


export default loadPrimitives;