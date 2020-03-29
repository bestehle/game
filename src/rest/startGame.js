const initialize = require('./initState');

module.exports = async (req, res) => {
	// console.log('GameId:', req.params.gameId);
	let gameId = req.params.gameId;
	if (gameId === undefined) {
		gameId = Math.random().toString(36).substr(2, 9);
	}
	let newGame = false;
	let name = req.query.name;
	if (name === undefined) {
		name = 'Unnamed';
	}
	console.log(name);

	await req.db
		.one('SELECT state FROM games WHERE game_id = $<id>', { id: gameId })
		.then(async (data) => {
			// console.log(data);
			let state = data.state;

			newGame = false;
		})
		.catch((error) => {
			console.log(error.message || error);

			console.log('Generate new game');
			initialize(req.db, gameId, name);

			newGame = true;
		});
	// console.log(result);

	console.log('Start Game', gameId, '-> new: ', newGame);

	res.json(gameId);
};
