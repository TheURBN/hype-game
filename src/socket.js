import io from 'socket.io-client';
import config from 'config/config.js';
import blockStore from 'config/voxelStore.js';
import createGame, { user } from './main.js';
import _ from 'lodash';


const socket = new WebSocket(config.ws.url);


socket.sendWs = (method = 'get', args) => {
  const data = {
    method,
    args,
  };

  socket.send(JSON.stringify(data));
};

socket.onmessage = (res) => {
  const data = JSON.parse(res.data);
  if (!_.isArray(data)) game.createBlock([data.x, data.z, data.y], data.owner);

  if (data.length) {
    blockStore.push(data);

    _.forEach(data, (val) => {
      game.createBlock([val.x, val.z, val.y], val.owner);
    });
  }
};

socket.onopen = () => {
  createGame();
  setTimeout(() => game.showAllChunks(), 500);

  const userPositon = user.getPosition();
  const range = config.ws.range;

  socket.send(socket.sendWs('get', { x: userPositon.x, y: userPositon.y, range }));
}

export default socket;
