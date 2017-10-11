import fly from 'voxel-fly';
import highlight from 'voxel-highlight';


import generateSample from './config/sample.js'

const defaultSetup = (game) => {
  const makeFly = fly(game)
  const target = game.controls.target()
  game.flyer = makeFly(target)

  let blockPosPlace, blockPosErase
  const hl = game.highlighter = highlight(game, {
      color: 0xff0000,
      distance: 4,
      adjacentActive: () => 1,
  })

  hl.on('highlight', function (voxelPos) { blockPosErase = voxelPos })
  hl.on('highlight-adjacent', function (voxelPos) { blockPosPlace = voxelPos })

  // block interaction stuff, uses highlight data
  let currentMaterial = 2;

  game.on('fire', function (target, state) {
    var position = blockPosPlace
    if (position) game.createBlock(position, currentMaterial)
  });


  // sample test block
  generateSample(game);
}


export default defaultSetup;