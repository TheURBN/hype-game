import config from 'config/config.js';
import _ from 'lodash';
import { alert } from 'notie';
import nanoid from 'nanoid';
import store from 'store';


async function loadVoxels(data) {
  await _.forEach(data, (val) => store.game.createBlock([val.x, val.z, val.y], val.owner));
}

const start = () => {
  const socket = new WebSocket(config.ws.url);
  store.ws = socket;
  socket.onclose = () => setTimeout(start, 5000);

  socket.sendWs = (type = 'range', args) => {
    const id = nanoid();
    const data = {
      type,
      id,
      args,
    };
  
    socket.send(JSON.stringify(data));
  };

  socket.onmessage = (res) => {
    const data = JSON.parse(res.data);
    const error = _.get(data, 'error.message');
  
    if (!_.isUndefined(error)) {
      return alert({
        type: 'error',
        text: error,
        position: 'bottom',
      });
    }

    if (data.meta.type === 'update') {
      const voxel = data.data;
      store.game.createBlock([voxel.x, voxel.z, voxel.y], voxel.owner);
    }

    if (data.meta.type === 'range') loadVoxels(data.data);
  };

  socket.onopen = () => {
    const userPositon = store.user.lastPosition;
    const range = config.ws.range;

    socket.send(socket.sendWs('range', { x: userPositon.x, y: userPositon.z, range: range * 2 }));
  }

  return socket;
}


export default start;
