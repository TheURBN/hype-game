import Flag from './store/flagStore.js';
import store from 'store';
import VoxelsWorker from './voxels.worker.js';

const worker = new VoxelsWorker();

const getColorIndex = (val) => {
  const index = _.indexOf(store.materials, val);

  if (index === -1) {
    store.materials.push(val);
    store.game.materials.materials.push(_.times(6, _.constant(val)));

    return _.indexOf(store.materials, val) + 1;
  }

  return index + 1;
};

async function loadVoxels(data) {
  if (_.isArray(data)) {
    await _.forEach(data, (val) => {
      if (val.capturable) store.flags.push(new Flag(val));

      store.game.setBlock([val.x, val.z, val.y], getColorIndex(val.owner))
    });
  } else {
    await store.game.setBlock([data.x, data.z, data.y], getColorIndex(data.owner));
  }
}


export default loadVoxels;