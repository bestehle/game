module.exports = async (req, res, state) => {
	const state = await req.db();
	res.json(state.currentSet);

	// req.db().then(() => {
	// 	res.json(state.currentSet);
	// });
};
