class GameStore {
  constructor() {
    this.game = {};
    this.user = {};
    this.ws = {};
    this.auth = {};
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