const light = (game) => {
  const THREE = game.THREE;
  
  const geometry = new THREE.CubeGeometry(10, 10, 10);
  const material = new THREE.MeshBasicMaterial();
  const cube = new THREE.Mesh( geometry, material );
  material.map = THREE.ImageUtils.loadTexture("dist/textures/sun.png");

  cube.position.set(440, 10, 440);
  game.addItem({ mesh: cube });

  animation();

  function animation() {
    requestAnimationFrame(animation);
    cube.rotation.y += 180/Math.PI * 0.001;
    game.render();
  };
}


export default light;