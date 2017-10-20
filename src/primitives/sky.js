const sky = (game) => {
  const THREE = game.THREE;
  
  const skySphere = new THREE.SphereGeometry(1000, 15, 15);
  const material = new THREE.MeshPhongMaterial();
  const sky = new THREE.Mesh(skySphere, material);

  material.map = THREE.ImageUtils.loadTexture("dist/textures/space.png");
  material.side = THREE.BackSide;
  material.fog = false;

  sky.position.set(500, 0, 500);
  game.addItem({ mesh: sky });
  game.view.camera.far = 100000;
  game.render();

  // animation();
  
  // function animation() {
  //   requestAnimationFrame(animation);
  //   sky.rotation.x += 180/Math.PI * 0.000001;
  //   sky.rotation.y += 180/Math.PI * 0.000001;
  //   game.render();
  // };
  
  return sky;
};

export default sky;