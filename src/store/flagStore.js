import { extendObservable, computed } from 'mobx';
import Flag from '../primitives/flag.js';
import store from './gameStore.js';


class FlagStore {
  constructor(flag) {
    this.flag = flag;
    this.position = [flag.x, flag.z, flag.y];
    this.owner = flag.owner;
    this.model = new Flag(store.game, this.position);
  }
}

export default FlagStore;
