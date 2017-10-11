const options = {
  chunkDistance: 2,
  textures: 'textures/',
  generate: (x, y, z) => y === 0,
  // lightsDisabled: true,
  materials: ['#fff', '#f0ff00','#800'],
  materialFlatColor: true,
  worldOrigin: [0, 0, 0],
  playerHeight: 2,
}

export default options;