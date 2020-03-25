const updateState = require('./updateState');

module.exports = (state, seed) => {
	// console.log(seed);

	// Load cards JSON with data of game cards
	const cards = require('./cards.json');
	const plans = require('./plans.json');

	if (seed === undefined) {
		seed = Math.floor(Math.random() * 10000 + 1);
	}

	var plan1 = Math.ceil(Math.random() * plans.plan1.length);
	// console.log('Plan1:', plan1);
	var plan2 = Math.ceil(Math.random() * plans.plan2.length);
	var plan3 = Math.ceil(Math.random() * plans.plan3.length);

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
	state.plans = [ plan1, plan2, plan3 ];
	state.planApproved = [ false, false, false ];

	state = updateState(state);

	return state;
};
