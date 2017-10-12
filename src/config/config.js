const controls = {
  discreteFire: true,
  jumpMaxSpeed: 0.01,
};

const options = {
  chunkDistance: 2,
  generate: (x, y, z) => y === 0,
  lightsDisabled: true,
  materials: ['#fff', '#1a85b7','#fcae3d', '#189232'],
  materialFlatColor: true,
  worldOrigin: [500, 10, 500],
  worldSize: [1000, 100, 1000],
  startingPosition: [500, 30, 500],
  playerHeight: 2,
  controls,
}

export default options;