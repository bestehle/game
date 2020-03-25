const seedrandom = require('seedrandom');

module.exports = (state) => {
	// console.log(req.params.gameId);
	state.round++;
	state.shuffled = false;
	if (state.index <= 1) {
		console.log('Shuffling cards');

		state.shuffledDecks = shuffleCards(state.cards, state.seed);
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

	// console.log(state);
	// console.log(state.index);
	// console.log(state.history);
	return state;
};

function shuffleCards(cards, seed) {
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
	return shuffledDecks;
}
