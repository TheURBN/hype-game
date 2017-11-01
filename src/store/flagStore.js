import { extendObservable, computed, observe } from 'mobx';
import Flag from '../primitives/flag.js';
import store from './gameStore.js';


class FlagStore {
  constructor(flag) {
    this.flag = flag;
    this.name = flag.name;
    this.position = [flag.x, flag.z, flag.y];
    this.owner = flag.owner;
    this.model = new Flag(store.game, this.position, this.owner);
  }

  update(flag) {
    this.captureFlag(flag);
    this.model.updateColor(flag.owner);
  }


  captureFlag(flag) {
    const isUserFlag = flag.owner === store.user.color;
    const userFlag = _.find(store.user.flags, { name: flag.name });
    
    if (isUserFlag && !userFlag) {
      store.captureFlag(flag);
      store.user.flags.push(flag);
    }

    if (userFlag && !isUserFlag) {
      store.captureFlag(flag, false);
      _.remove(store.user.flags, userFlag);
    }
  }
}

export default FlagStore;
