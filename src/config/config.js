import color from './materials.js'; 
import voxel from 'voxel';

const game = {
  chunkDistance: 4,
  removeDistance: 16,
  generate: (x, y, z) => y === -1,
  materials: color,
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
  leaderboard: 5000,
  ws: 'wss://turg-svc.herokuapp.com/v1/ws/',
  url: process.env.NODE_ENV === 'production' ? 'https://turg-svc.herokuapp.com' : 'http://localhost:5000',
  range: 200,
  side: 1000,
  worldSize: [1000, 100, 1000],
}


export default options;