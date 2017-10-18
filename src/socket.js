import config from 'config/config.js';
import voxelStore from 'config/voxelStore.js';
import createGame, { user } from './main.js';
import _ from 'lodash';
import { alert } from 'notie';
import Worker from './voxels.worker.js'

const worker = new Worker()
const wsTimes = document.querySelector('#wsTime');
let value = 0;

worker.addEventListener('message', (event) => {
  if (event.data.type = "complite") {
    _.forEach(event.data.data, (val) => game.createBlock([val.x, val.z, val.y], val.owner));
  }
});

let socket;

async function loadVoxels(data) {
  await worker.postMessage({type: 'range', data, voxelStore: voxelStore.items});
}

const start = () => {
  socket = new WebSocket(config.ws.url);
  socket.onclose = () => setTimeout(start, 5000);

  socket.sendWs = (type = 'range', args) => {
    const data = {
      type,
      args,
    };
  
    socket.send(JSON.stringify(data));
  };

  socket.onmessage = (res) => {
    wsTimes.innerHTML = 'ws receive: ' + _.floor(value++);
    const data = JSON.parse(res.data);
    const error = _.get(data, 'error.message');
  
    if (error) {
      alert({
        type: 'error',
        text: error,
        position: 'bottom',
      });
    }

    if (data.meta.type === 'update') {
      const voxel = data.data;
      game.createBlock([voxel.x, voxel.z, voxel.y], voxel.owner);
    }

    if (data.meta.type === 'range') {
      console.log(data.data.length);
      loadVoxels(data.data);
    }
  };

  socket.onopen = () => {
    if (_.isUndefined(window.game)) {
      createGame();
      setTimeout(() => game.showAllChunks(), 500);
    }

    const userPositon = user.getPosition();
    const range = config.ws.range;

    socket.send(socket.sendWs('range', { x: userPositon.x, y: userPositon.z, range }));
    setTimeout(() => {
      socket.send(socket.sendWs('range', { x: userPositon.x, y: userPositon.z, range }));
    }, 5000)
  }
}

start();


export default socket;
