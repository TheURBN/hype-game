import config from './config/config.js';
import fly from 'voxel-fly';
import highlight from 'voxel-highlight';
import socket from './socket.js';
import { alert } from 'notie';
import _ from 'lodash';
import voxelStore from './config/voxelStore.js';


const controls = (game, user) => {
  let blockPosPlace;
  const hl = game.highlighter = highlight(game, {
      color: 0xff0000,
      distance: 4,
      adjacentActive: () => true,
  })

  hl.on('remove-adjacent', () => blockPosPlace = null);
  hl.on('highlight-adjacent', (voxel) => blockPosPlace = voxel);
  
  game.chunkRegion.on('change', (pos) => {
    const userPositon = user.getPosition();
    const range = config.ws.range;
    const paddingX = Math.abs(user.lastPosition.x - userPositon.x);
    const paddingZ = Math.abs(user.lastPosition.z - userPositon.z);

    if (!user.start) socket.sendWs('range', { x: userPositon.x, y: userPositon.z, range }); user.start = true;

    if (paddingX >= game.chunkSize || paddingZ >= game.chunkSize) {
      user.lastPosition = userPositon;
      socket.sendWs('range', { x: userPositon.x, y: userPositon.z, range });
    };
  });

  game.on('fire', (target, state) => {

    const position = blockPosPlace;

    if (position && _.every(position, (v, k) => v < config.worldSize[k] && v > 0) && game.canCreateBlock(position)) {
      const [x, z, y] = position;

      socket.sendWs('update', { x, y, z, owner: user.color });
    } else {
      if (position) alert({ type: 'warning', text: 'Voxel cannot be created at this position', position: 'bottom' });
    }
  });
}


export default controls;