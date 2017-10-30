import { observable, autorun } from 'mobx';
import material from 'config/materials.js';
import Flag from './flagStore.js';
import _ from 'lodash';


class GameStore {
  constructor() {
    this.game = null;
    this.user = null;
    this.ws = null;
    this.auth = null;
    this.materials = material;
    this.flags = observable([1]);
    this.firstLoad = observable(true);
    this.messages = [];

    autorun(() => {
      if (!this.firstLoad.get()) this.hideMainLoader();
    });
  }
  
  createFlag(flag) {
    const currentFlag = _.find(this.flags, { name: flag.name });
    
    if (currentFlag) {
      return currentFlag.update(flag);
    }

    if (flag.owner === this.user.color) this.user.flags.push(flag);

    return this.flags.push(new Flag(flag));
  }

  hideMainLoader() {
    this.section('app').show();
    this.section('loader').hide();
    this.section('loader').remove();
    store.section('sign-in').hide();
    store.section('sign-in').remove();
  };

  section(name) {
    const element = document.getElementById(name);
  
    const actions = {
      show: () => element.style.display = '',
      hide: () => element.style.display = 'none',
      remove: () => element.innerHTML = '',
    };
  
     return actions;
  };

  destroy() {
    this.section('app').remove();
  };

  emitMessage(msg) {
    const event = {
      text: msg,
      time: + new Date(),
    };

    this.messages.push(event);
  };
}

export default new GameStore();