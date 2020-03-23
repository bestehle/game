module.exports = (req, res, state) => {
	// console.log(req.params.gameId);
	// console.log(state.history);
	res.json(state.history);
};
