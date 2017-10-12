import config from './config/config.js';
import fly from 'voxel-fly';
import highlight from 'voxel-highlight';
import socket from './socket.js';
import _ from 'lodash';
import blockStore from './config/voxelStore.js'


const controls = (game, user) => {
  let blockPosPlace, blockPosErase
  const hl = game.highlighter = highlight(game, {
      color: 0xff0000,
      distance: 4,
      adjacentActive: () => 1,
  })

  hl.on('highlight-adjacent', function (voxelPos) { blockPosPlace = voxelPos })

  game.chunkRegion.on('change', (pos) => {
    const userPositon = user.getPosition();
    const range = config.ws.range;

    socket.sendWs('get', { x: userPositon.x, y: userPositon.z, range });
  });

  game.on('fire', (target, state) => {
    const position = blockPosPlace;

    if (position && _.every(position, (v, k) => v < config.worldSize[k] && v > 0)) {
      const [x, z, y] = position;

      socket.sendWs('post', {
        x, y, z,
        owner: user.color,
      });
    }
  });
}


export default controls;