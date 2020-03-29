module.exports = async (req, res) => {
	let games = {};
	await req.db
		.any('SELECT game_id, name, timestamp FROM games')
		.then(async (data) => {
			// console.log(data);
			games = data;
		})
		.catch((error) => {
			console.log(error.message || error);
		});
	// console.log(result);

	// console.log('Active games', games);

	res.json(games);
};
