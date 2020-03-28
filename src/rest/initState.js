const updateState = require('./updateState');

module.exports = (state, db, seed) => {
	// console.log(seed);

	// Load cards JSON with data of game cards
	// const cards = require('./cards.json');
	// const plans = require('./plans.json');

	db
		.task('get-resources', async (t) => {
			const cards = await t.any(
				"SELECT card -> 'id' AS id, card -> 'number' AS number, card -> 'action' AS action FROM cards"
			);
			const plans = await t.any(
				"SELECT plan -> 'cat' AS cat, plan -> 'id' AS id, plan -> 'first' AS first, plan -> 'others' AS others FROM plans"
			);
			return { cards, plans };
		})
		.then((data) => {
			const cards = data.cards;
			console.log(cards);
			const plans = data.plans;
			console.log(plans);

			if (seed === undefined) {
				seed = Math.floor(Math.random() * 10000 + 1);
			}

			// var plan1 = Math.ceil(Math.random() * plans.plan1.length);
			// // console.log('Plan1:', plan1);
			// var plan2 = Math.ceil(Math.random() * plans.plan2.length);
			// var plan3 = Math.ceil(Math.random() * plans.plan3.length);

			// State of game
			state.seed = seed;
			state.index = 0;
			state.shuffledDecks = null;
			state.currentSet = null;
			state.round = 0;
			state.deckLog = [];
			state.history = [];
			state.shuffled = false;
			// state.plans = [ plan1, plan2, plan3 ];
			state.plansApproved = [ false, false, false ];

			updateState(state, db);
		})
		.catch((error) => {
			console.log(error);
		});
};
