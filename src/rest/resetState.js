const initialize = require('./initState');

module.exports = async (req, res) => {
	let gameId = req.params.gameId;
	console.log('Reset game:', req.params.gameId);

	await initialize(req.db, gameId);

	res.json([ gameId ]);
};
