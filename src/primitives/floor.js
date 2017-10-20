const floor = (game) => {
  const THREE = game.THREE;
  const scene = game.scene;

  const geometry = new THREE.PlaneGeometry(1000, 1000, 100);
  const material = new THREE.MeshBasicMaterial({ side: THREE.DoubleSide });
  const texture = THREE.ImageUtils.loadTexture("dist/textures/mars.jpg");
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.offset.set(1, 1);
  texture.repeat.set(1, 1);

  material.map = texture;
  const plane = new THREE.Mesh( geometry, material );
  plane.position.set(500, 1.1, 500);
  plane.rotation.x += Math.PI / 2;

  scene.add( plane );
}


export default floor;