const sampleBlock = (game) => {
  game.createBlock([0, 1, 0], 2);
	game.createBlock([0, 2, 0], 2);
	game.createBlock([0, 2, 1], 2);
	game.createBlock([0, 1, 1], 3);
	game.createBlock([-1, 1, 1], 3);
	game.createBlock([-1, 1, 0], 4);
	game.createBlock([-1, 2, 0], 4);
};


export default sampleBlock;