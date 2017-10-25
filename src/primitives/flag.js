import config from '../config/config.js';

class Flag {
  constructor(game, position) {
    this.object = this.createObject(game);
    this.position = this.setPosition(position);

    game.scene.add(this.object);
  }

  createObject(game) {
    const THREE = game.THREE;
    const PI = Math.PI;
    const DEF_COLOR = 0x353535;
  
    const flagGroup = new THREE.Object3D();
    const mainMaterial = new THREE.MeshBasicMaterial({ color: DEF_COLOR });
    const flagMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide, wireframe: true });
  
    // bottom
    const flagBottom = new THREE.Mesh(new THREE.CubeGeometry(2, 2, 0.3), mainMaterial);
    flagBottom.rotation.x = PI / 2;
    flagGroup.add(flagBottom);
    
    // body
    const flagBody = new THREE.Mesh(new THREE.CubeGeometry(0.1, 3, 0.1), mainMaterial);
    flagBody.position.y = 1.5;
    flagGroup.add(flagBody);
  
    // plane flage
    const flagPlane = new THREE.Mesh(new THREE.PlaneGeometry(1.5, 1), flagMaterial);
    flagPlane.position.set(0.75, 2.45, 0);
    flagGroup.add(flagPlane);
    this.flag = flagPlane;

    return flagGroup;
  }

  setPosition(pos) {
    this.object.position.set(pos[0] + 0.5, pos[1], pos[2] + 0.5);

    return pos;
  };
}

export default Flag;