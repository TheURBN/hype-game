import config from 'config/config.js';
import voxelStore from 'config/voxelStore.js';
import createGame, { user } from './main.js';
import _ from 'lodash';
import { alert } from 'notie';

let socket;

const start = () => {
  socket = new WebSocket(config.ws.url);
  socket.onclose = () => setTimeout(start, 5000);

  socket.sendWs = (method = 'get', args) => {
    const data = {
      method,
      args,
    };
  
    socket.send(JSON.stringify(data));
  };

  socket.onmessage = (res) => {
    const data = JSON.parse(res.data);
    const error = _.get(data, 'error.message');
  
    if (!_.isArray(data) && !error) game.createBlock([data.x, data.z, data.y], data.owner);
  
    if (error) {
      alert({
        type: 'error',
        text: error,
        position: 'bottom',
      });
    }

    if (data.length) {
      _.forEach(data, val => game.createBlock([val.x, val.z, val.y], val.owner));
    }
  };

  socket.onopen = () => {
    if (_.isUndefined(window.game)) {
      createGame();
      setTimeout(() => game.showAllChunks(), 500);
    }

    const userPositon = user.getPosition();
    const range = config.ws.range;

    socket.send(socket.sendWs('get', { x: userPositon.x, y: userPositon.y, range }));
  }
}

start();


export default socket;
