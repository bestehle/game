module.exports = async (req, res, state) => {
	// state = await req.db.one();
	res.json(state.currentSet);

	// req.db().then(() => {
	// 	res.json(state.currentSet);
	// });
};
