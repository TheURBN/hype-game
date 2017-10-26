import _ from 'lodash';
import store from 'store';

onmessage = (e) => {
  console.log(e.data, store);
  if (e.data.voxels) {
    const voxels = _.isArray(e.data.voxels) ? e.data.voxels : [e.data.voxels];
    const data = _.map(voxels, (val) => {
      if (_.isString(val.owner)) {
        if (!_.includes(store.materials, val.owner)) {
          store.materials.push('1');
          postMessage({type: 'addColor', data: val.owner });
        };
      }
    });
  }
}