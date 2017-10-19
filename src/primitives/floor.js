const floor = (game) => {
  const THREE = game.THREE;
  const scene = game.scene;

  const geometry = new THREE.PlaneGeometry(1000, 1000, 150);
  const material = new THREE.MeshBasicMaterial({ side: THREE.DoubleSide });
  material.map = THREE.ImageUtils.loadTexture("dist/textures/urbn_logo.png");
  const plane = new THREE.Mesh( geometry, material );
  plane.position.set(500, 1.01, 500);
  plane.rotation.x += Math.PI / 2;

  scene.add( plane );
}


export default floor;