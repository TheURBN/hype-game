import config from './config/config.js';
import fly from 'voxel-fly';
import highlight from 'voxel-highlight';
import { alert } from 'notie';
import _ from 'lodash';
import store from 'store';


const controls = (game, user) => {
  let blockPosPlace;
  const hl = game.highlighter = highlight(game, {
      color: 0xff0000,
      distance: 4,
      animate: true,
      animateFunction: (position, targetPosition) => {
        if (!position || !targetPosition) return;

        if (_.floor(targetPosition[1]) === 0) targetPosition[1] = 0.505;

        position[0] += targetPosition[0] - position[0]
        position[1] += targetPosition[1] - position[1]
        position[2] += targetPosition[2] - position[2]

        return position;
      },
      adjacentActive: () => {
        if (_.find(store.flags, { position: game.highlighter.currVoxelPos })) {
          blockPosPlace = game.highlighter.currVoxelPos;

          return false;          
        }

        return true;
      },
  })

  hl.on('remove-adjacent', () => blockPosPlace = null);
  hl.on('highlight', (voxel) => blockPosPlace = voxel);
  hl.on('highlight-adjacent', (voxel) => blockPosPlace = voxel);
  
  game.chunkRegion.on('change', (pos) => {
    const userPositon = user.getPosition();
    const range = config.range;
    const gameRange = config.range / 2;
    const paddingX = Math.abs(user.lastPosition.x - userPositon.x);
    const paddingZ = Math.abs(user.lastPosition.z - userPositon.z);

    if (paddingX >= gameRange || paddingZ >= gameRange) {
      user.lastPosition = user.getPosition();
      store.ws.sendWs('range', { x: userPositon.x, y: userPositon.z, range: gameRange });
    };
  });

  game.on('fire', (target, state) => {
    const position = blockPosPlace;

    if (position && _.every(position, (v, k) => v < config.worldSize[k] && v > -1)) {
      const [x, z, y] = position;

      store.ws.sendWs('update', { x, y, z, owner: 'null' });
    } else {
      if (_.every(position, (v, k) => v < config.worldSize[k] && v > -1)) alert({ type: 'warning', text: 'Voxel cannot be created at this position', position: 'bottom' });
    }
  });
}


export default controls;