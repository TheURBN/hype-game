import player from 'voxel-player';
import fly from 'voxel-fly';
import colors from 'config/materials.js';
import _ from 'lodash';
import { observable } from 'mobx';



class User {
  constructor(user, position = { x: 500, y: 5, z: 500 }, color = 3) {
    this.name = user.displayName;
    this.email = user.email;
    this.uid = user.uid;
    this.token = user.token;
    this.photo = user.photoURL;
    this.startPosition = position;
    this.lastPosition = position;
    this.color = color;
    this.flags = observable([]);
    this.points = observable(0);
    this.admin = user.email === 'ruscheglov@gmail.com';
  }

  init(game) {
    this.avatar = player(game)();
    this.avatar.possess();
    this.setPosition();
    this.removeBody();
    this.makeFly(game);
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