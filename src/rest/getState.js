module.exports = (req, res, state) => {
	res.json(state.currentSet);
};
