import _ from 'lodash';


onmessage = (e) => {
  if (e.data.type === 'range') {
    const data = _.filter(e.data.data, (val) => !_.includes(e.data.voxelStore, val));

    postMessage({type: 'complite', data});
  }
}