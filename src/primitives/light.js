const light = (game) => {
  const scene = game.scene;

  var light = new THREE.PointLight( 0xff0000, 1, 100 );
  light.position.set(540, 20, 522);
  scene.add( light );

  game.render();
}


export default light;