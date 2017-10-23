import vertexShader from '../shaders/floor/vertex.glsl';
import fragmentShader from '../shaders/floor/fragment.glsl';
import config from '../config/config.js';

const floor = (game) => {
  const THREE = game.THREE;
  const scene = game.scene;
  // console.log(game.camera.position);

  // const uniforms = {
  //   time: { value: 1.0 },
  //   resolution: { value: new THREE.Vector2() },
  //   position: game.camera.position,
  //   fogColor: { value: new THREE.Color() },
  //   fogNear: { value: 20 },
  //   fogFar: { value: 40 },
  //   worldSize: { type: 'f', value: 1000 },
  // };

  // const material = new THREE.ShaderMaterial({
  //   vertexShader,
  //   fragmentShader,
  //   uniforms,
  //   fog: true,
  // });

  const texture = THREE.ImageUtils.loadTexture("dist/textures/floor.png");
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(config.side, config.side);

  const geometry = new THREE.PlaneGeometry(config.side, config.side, 1);
  const material = new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide });

  const plane = new THREE.Mesh( geometry, material );
  plane.position.set(500, 0.005, 500);
  plane.rotation.x += Math.PI / 2;

  scene.add( plane );
}


export default floor;