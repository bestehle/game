module.exports = (req, res) => {
	let gameId = req.params.gameId;

	req.db
		.one("SELECT state -> 'history' AS state FROM games WHERE game_id = $<id>", { id: gameId })
		.then(async (data) => {
			console.log(data);
			let state = data.state;

			res.json(state);
		})
		.catch((error) => {
			console.log(error.message || error);
			res.json('error for ' + gameId);
		});
};
