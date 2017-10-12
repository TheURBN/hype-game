import io from 'socket.io-client';
import ws from 'config/ws.js';
import config from 'config/config.js';
import blockStore from 'config/sample.js';
import createGame from './main.js';
import _ from 'lodash';


const socket = new WebSocket(ws.url);

socket.onmessage = (res) => {
  const data = JSON.parse(res.data);
  console.log(data);
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

  socket.send(`{"method": "get", "args":{"x": ${config.startingPosition[0]}, "y":${config.startingPosition[2]},"range":50}}`);
}

export default socket;
