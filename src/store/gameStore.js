import * as mobx from 'mobx';
import material from '../config/materials.js';


class GameStore {
  constructor() {
    this.game = null;
    this.user = null;
    this.ws = null;
    this.auth = null;
    this.materials = material;
    this.flags = mobx.observable([]);
    this.firstLoad = mobx.observable(true);

    mobx.autorun(() => {
      if (!this.firstLoad.get()) this.hideMainLoader();
    });
  }
  
  hideMainLoader() {
    this.section('app').show();
    this.section('loader').hide();
    this.section('loader').remove();
    store.section('sign-in').hide();
    store.section('sign-in').remove();
  }

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
  }  
}

export default new GameStore();