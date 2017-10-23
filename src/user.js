import player from 'voxel-player';
import fly from 'voxel-fly';
import voxelDebug from 'voxel-debug';
import colors from 'config/materials.js';
import _ from 'lodash';



class User {
  constructor(user, position = { x: 500, y: 5, z: 500 }, color = _.random(2, colors.length)) {
    this.name = user.displayName;
    this.email = user.email;
    this.id = user.uid;
    this.token = user.getIdToken();
    this.photo = user.photoURL;
    this.startPosition = position;
    this.lastPosition = position;
    this.color = color + 1;
    this.admin = user.email === 'ruscheglov@gmail.com';
  }

  init(game) {
    this.avatar = player(game)();
    this.avatar.possess();
    game.gravity = [0, -0.000000006, 0]
    this.setPosition();
    this.removeBody();
    if(this.admin) voxelDebug(game).close();
  }

  setPosition(x = 500, y = 5, z = 500) {
    this.avatar.yaw.position.set(x, y, z);
  }

  getPosition() {
    const x = _.floor(this.avatar.position.x);
    const y = _.floor(this.avatar.position.y);
    const z = _.floor(this.avatar.position.z);

    return { x, y, z };
  }

  removeBody() {
    const playerSkin = this.avatar.playerSkin;

    playerSkin.playerModel.remove(playerSkin.upperbody);
    playerSkin.playerModel.remove(playerSkin.leftLeg);
    playerSkin.playerModel.remove(playerSkin.rightLeg);
  }

  makeFly(game) {
    const makeFly = fly(game)
    const target = this.avatar;
    game.flyer = makeFly(target);
  }
}

export default User;