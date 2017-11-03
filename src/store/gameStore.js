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
    this.flags = [];
    this.firstLoad = true;
    this.messages = [];
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
    this.firstLoad = false;
    this.section('app').show();
    this.section('loader').hide();
    this.section('loader').remove();
    this.section('sign-in').hide();
    this.section('sign-in').remove();
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