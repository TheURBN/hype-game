import config from './config/config.js';
import fly from 'voxel-fly';
import highlight from 'voxel-highlight';
import socket from './socket.js';
import _ from 'lodash';

import blockStore from './config/sample.js'

const defaultSetup = (game, user) => {
  let blockPosPlace, blockPosErase
  const hl = game.highlighter = highlight(game, {
      color: 0xff0000,
      distance: 4,
      adjacentActive: () => 1,
  })

  hl.on('highlight-adjacent', function (voxelPos) { blockPosPlace = voxelPos })

  game.chunkRegion.on('change', (pos) => {
    const x = _.floor(user.avatar.position.x);
    const y = _.floor(user.avatar.position.z);

    socket.send(`{"method": "get", "args":{"x": ${x}, "y":${y},"range":50}}`);
  });

  game.on('fire', (target, state) => {
    const position = blockPosPlace;

    if (position && _.every(position, (v, k) => v < config.worldSize[k] && v > 0)) {
      game.createBlock(position, user.color);
      console.log(user);
      socket.send(`{"method": "post", "args":{"x": ${position[0]}, "y":${position[2]}, "z": ${position[1]}, "owner":${user.color}}}`);
    }
  });
}


export default defaultSetup;