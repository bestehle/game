module.exports = (req, res, state) => {
	// console.log(req.params.gameId);

	state.index = state.index - 1;
	res.json(state.index);
};
