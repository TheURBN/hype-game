import config from '../config/config.js';

class Flag {
  constructor(game, position = { x: 500, y: 5, z: 500 }, color = 3) {
    this.flag = '';
    this.object = this.createObject(game);
    this.position = this.setPosition(position);

    game.scene.add(this.object);
  }

  createObject(game) {
    const THREE = game.THREE;
    const PI = Math.PI;
  
    const flagGroup = new THREE.Object3D();
    const mainMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const voxelMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true, wireframeLinewidth: 3 });
    const flagMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000, side: THREE.DoubleSide });
  
    // bottom
    const flagBottom = new THREE.Mesh(new THREE.CubeGeometry(2, 2, 0.3), mainMaterial);
    flagBottom.rotation.x = PI / 2;
    flagGroup.add(flagBottom);
    
    // body
    const flagBody = new THREE.Mesh(new THREE.CubeGeometry(0.1, 3, 0.1), mainMaterial);
    flagBody.position.y = 1.5;
    flagGroup.add(flagBody);

    // fakeVoxel
    const fakeVoxel = new THREE.Mesh(new THREE.CubeGeometry(1, 1, 1), voxelMaterial);
    fakeVoxel.position.y = 0.5;
    flagGroup.add(fakeVoxel);
  
    // plane flage
    const flagPlane = new THREE.Mesh(new THREE.PlaneGeometry(1.5, 1), flagMaterial);
    flagPlane.position.set(0.75, 2.5, 0);
    flagGroup.add(flagPlane);
    this.flag = flagPlane;

    return flagGroup;
  }

  setPosition(pos) {
    this.object.position.set(pos.x + 0.5, pos.z, pos.y + 0.5);
  };
}

export default Flag;