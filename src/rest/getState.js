module.exports = (req, res, state) => {
	const currentSet = {
		actions: state.cards[state.index],
		numbers: state.cards[state.index - 1]
	};
	res.json(currentSet);
};
