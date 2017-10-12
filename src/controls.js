import fly from 'voxel-fly';
import highlight from 'voxel-highlight';


import generateSample from './config/sample.js'

const defaultSetup = (game, user) => {
  let blockPosPlace, blockPosErase
  const hl = game.highlighter = highlight(game, {
      color: 0xff0000,
      distance: 4,
      adjacentActive: () => 1,
  })
 
  hl.on('highlight-adjacent', function (voxelPos) { blockPosPlace = voxelPos })

  game.on('fire', function (target, state) {
    var position = blockPosPlace
    if (position) game.createBlock(position, user.color)
  });


  // sample test block
  generateSample(game);
}


export default defaultSetup;