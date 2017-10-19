import { color } from './voxelStore.js'; 
import voxel from 'voxel';

const controls = {
  discreteFire: true,
  airControl: false,
};

const ws = {
  url: 'wss://turg-svc.herokuapp.com/v1/ws/',
  range: 100,
}

const options = {
  chunkDistance: 4,
  removeDistance: 20,
  generate: (x, y, z) => y === 0,
  materials: color,
  materialFlatColor: true,
  // texturePath: './dist/textures/blocks/', 
  worldOrigin: [500, 10, 500],
  worldSize: [1000, 100, 1000],
  startingPosition: [500, 30, 500],
  skyColor: '0x000000',
  playerHeight: 2,
  mesher: voxel.meshers.greedy,
  controls,
  ws,
}

export default options;