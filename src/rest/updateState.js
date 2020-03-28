const saveState = require('./saveState');

module.exports = async (db, gameId) => {
	console.log('Start updateState');
	let result;
	await db
		.one('SELECT state FROM games WHERE game_id = $<id>', { id: gameId })
		.then(async (data) => {
			// console.log(data);
			let state = data.state;

			await updateStateProperties(db, state);
			// console.log(state);

			let saved = await saveState(db, gameId, state);
			console.log('Updated saved:', saved);

			return state.currentSet;
		})
		.catch((error) => {
			console.log(error.message || error);
			return false;
		});
};

async function updateStateProperties(db, state) {
	state.round++;

	state.shuffled = false;
	if (state.index <= 1) {
		console.log('Shuffling cards');

		const cards = await db.any(
			"SELECT card -> 'id' AS id, card -> 'number' AS number, card -> 'action' AS action FROM cards"
		);

		state.shuffledDecks = shuffleCards(cards, state.seed);

		state.index = state.shuffledDecks.length;

		state.deckLog.push(state.shuffledDecks);
		state.shuffled = true;
	}
	state.index = state.index - 1;

	state.currentSet = {
		round: state.round,
		actions: state.shuffledDecks[state.index],
		numbers: state.shuffledDecks[state.index - 1],
		shuffled: state.shuffled,
		plans: state.plans,
		plansApproved: state.plansApproved
	};

	state.history.push(state.currentSet);
}

function shuffleCards(cards, seed) {
	const seedrandom = require('seedrandom');
	var myrng = seedrandom(seed);

	var numCards = cards.length;
	var shuffledDecks = Array();
	var cardstack = [ ...Array(numCards).keys() ].map((i) => i);
	// console.log(cardstack);

	while (cardstack.length > 0) {
		var index;
		var cardTriple = Array();
		// Stack 1
		index = cardstack.length * myrng();
		cardTriple[0] = cardstack.splice(index, 1)[0];
		// Stack 2
		index = cardstack.length * myrng();
		cardTriple[1] = cardstack.splice(index, 1)[0];
		// Stack 3
		index = cardstack.length * myrng();
		cardTriple[2] = cardstack.splice(index, 1)[0];
		// console.log(cardTriple);

		shuffledDecks.push(cardTriple);
	}
	console.log('Cards shuffled');
	return shuffledDecks;
}
