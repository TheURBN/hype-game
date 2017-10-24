import config from 'config/config.js';
import _ from 'lodash';
import { alert } from 'notie';
import nanoid from 'nanoid';
import store from 'store';
import delay from 'nanodelay';


async function loadVoxels(data) {
  if (_.isArray(data)) {
    await _.forEach(data, (val) => {
      if (val.capturable) store.flags.push(val);

      store.game.createBlock([val.x, val.z, val.y], val.owner)
    });
  } else {
    await store.game.createBlock([data.x, data.z, data.y], data.owner)
  }
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
      if(data.conflict) loadVoxels(data.conflict);

      return alert({
        type: 'error',
        text: error,
        position: 'bottom',
      });
    }

    if (data.meta.type === 'update' || data.meta.type === 'range') {
      loadVoxels(data.data).then(() => {
  
        if (store.firstLoad.get()) return delay(2000).then(() => store.firstLoad.set(false));
      });
    }
  };

  socket.onopen = () => {
    const userPositon = store.user.lastPosition;
    const range = config.ws.range;

    socket.send(socket.sendWs('range', { x: userPositon.x, y: userPositon.z, range: range * 2 }));
  }

  return socket;
}


export default start;
