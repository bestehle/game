const updateState = require('./updateState');

module.exports = (state, seed) => {
	// console.log(seed);

	// Load cards JSON with data of game cards
	const cards = require('./cards.json');

	if (seed === undefined) {
		seed = Math.floor(Math.random() * 10000 + 1);
	}

	// State of game
	state.seed = seed;
	state.index = 0;
	state.cards = cards;
	state.shuffledDecks = null;
	state.currentSet = null;
	state.round = 0;
	state.deckLog = [];
	state.history = [];
	state.shuffled = false;
	state.plans = [ false, false, false ];

	state = updateState(state);

	return state;
};
