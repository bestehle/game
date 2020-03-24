const initialize = require('./initState');

module.exports = (req, res, state) => {
	// console.log('GameId:', req.params.gameId);
	let seed = req.params.gameId;

	if (seed === undefined) {
		seed = 'start';
		seed = Math.floor(Math.random() * 10000 + 1);
	}
	console.log('Seed:', seed);

	state = initialize(state, seed);

	res.json([ state.index, state.seed ]);
};
