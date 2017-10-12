const controls = {
  discreteFire: true,
  jumpMaxSpeed: 0.01,
};

const options = {
  chunkDistance: 2,
  generate: (x, y, z) => y === 0,
  lightsDisabled: true,
  materials: ['#fff', '#f0ff00','#800'],
  materialFlatColor: true,
  worldOrigin: [0, 0, 0],
  playerHeight: 2,
  controls,
}

export default options;