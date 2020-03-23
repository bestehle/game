const updateState = require('./updateState');

module.exports = (req, res, state) => {
	// console.log(req.params.gameId);

	state = updateState(state);

	res.json(state.index);
};
