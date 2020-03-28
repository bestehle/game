module.exports = async (db, gameId, state) => {
	let result;
	await db
		.query(
			'INSERT INTO games(game_id, state) VALUES($<id>,$<state>) ON CONFLICT(game_id) DO UPDATE SET state = $<state>',
			{
				id: gameId,
				state: state
			}
		)
		.then((data) => {
			result = true;
		})
		.catch((error) => {
			console.log(error.message || error);
			result = false;
		});
	// console.log(result);
	return result;
};
