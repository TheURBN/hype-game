import _ from 'lodash';
import { alert } from 'notie';
import nanoid from 'nanoid';
import delay from 'nanodelay';
import Vue from 'vue';
import User from './user.js';
import Game from './game.js';
import config from 'config/config.js';
import store from 'store';
import loadVoxels from './voxels.js';
import loadVue from './components';
import template from "html-loader!./components/help.html";



const socketEngine = {
  userColor: (data) => {
    store.user.color = data.data.color;

    if (!store.game) {
      const elem = document.getElementById("loader-container")
      elem.innerHTML = template;
      store.game = Game();
      loadVue();
    };
  },
  update: (data) => loadVoxels(data.data),
  range: (data) => {
    loadVoxels(data.data).then(() => {
      if (store.firstLoad.get()) return delay(2000).then(() => store.firstLoad.set(false));
    });
  },
  error: (data) => {
    if (data.error.conflict) loadVoxels(data.error.conflict);

    return alert({
      type: 'error',
      text: data.error.message,
      position: 'bottom',
    });
  },
  userLogin: (data) => {
    store.emitMessage(`${data.data.name} has joined the game`);
  },
  userLogout: (data) => {
    store.emitMessage(`${data.data.name} left the game`);
  },
  flagCaptured: (data) => {
    store.emitMessage(`${data.data.name} captured the flag "${data.data.flag}"`);
  },
};

const connectGame = (user) => {
  const socket = new WebSocket(`${config.ws}?token=${user.token}`);
  store.ws = socket;

  socket.sendWs = (type = 'range', args) => {
    const id = nanoid();
    const data = {
      type,
      id,
      args,
    };
  
    socket.send(JSON.stringify(data));
  };

	socket.addEventListener('message', (res) => {
    const data = JSON.parse(res.data);
    const error = _.get(data, 'error.message');
    const type = _.get(data, 'meta.type', 'error');

    if (error) return socketEngine.error(data);
    
    if (_.get(socketEngine, type)) socketEngine[type](data);
  });

  socket.addEventListener('close', () => setTimeout(() => connectGame(store.user), config.timeout));
  socket.addEventListener('open', () => {
    const userPositon = store.user.lastPosition;
    const range = config.range;

    socket.sendWs('range', { x: userPositon.x, y: userPositon.z, range: range });
  });
};

export default connectGame;
