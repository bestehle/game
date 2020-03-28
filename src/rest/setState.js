const updateState = require('./updateState');

module.exports = (req, res) => {
	console.log('Next on', req.params.gameId);

	updateState(req.db, req.params.gameId);

	res.json('next');
};
