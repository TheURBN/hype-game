import color from './materials.js'; 
import voxel from 'voxel';
import store from '../store/gameStore.js';

const game = {
  chunkDistance: 4,
  removeDistance: 16,
  generate: (x, y, z) => y === -1,
  materials: store.colors || color,
  materialFlatColor: true,
  // texturePath: './dist/textures/blocks/', 
  worldOrigin: [500, 10, 500],
  worldSize: [1000, 100, 1000],
  startingPosition: [500, 5, 500],
  skyColor: '0x000000',
  playerHeight: 2,
  mesher: voxel.meshers.greedy,
  controls: {
    discreteFire: true,
  },
}

const options = {
  game,
  ws: 'wss://turg-svc.herokuapp.com/v1/ws/',
  url: 'https://turg-svc.herokuapp.com/v1/',
  range: 100,
  side: 1000,
  worldSize: [1000, 100, 1000],
}


export default options;