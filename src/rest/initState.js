const updateState = require('./updateState');
const saveState = require('./saveState');

module.exports = async (db, gameId, name) => {
	db
		.task('get-resources', async (t) => {
			const plan1 = await t.any(
				"SELECT plan -> 'cat' AS cat, plan -> 'id' AS id, plan -> 'first' AS first, plan -> 'others' AS others FROM plans WHERE plan ->> 'cat' = '1'"
			);
			const plan2 = await t.any(
				"SELECT plan -> 'cat' AS cat, plan -> 'id' AS id, plan -> 'first' AS first, plan -> 'others' AS others FROM plans WHERE plan ->> 'cat' = '2'"
			);
			const plan3 = await t.any(
				"SELECT plan -> 'cat' AS cat, plan -> 'id' AS id, plan -> 'first' AS first, plan -> 'others' AS others FROM plans WHERE plan ->> 'cat' = '3'"
			);
			return { plan1, plan2, plan3 };
		})
		.then(async (data) => {
			const plans = data;
			// console.log(plans);

			var plan1 = Math.ceil(Math.random() * plans.plan1.length);
			var plan2 = Math.ceil(Math.random() * plans.plan2.length);
			var plan3 = Math.ceil(Math.random() * plans.plan3.length);

			const state = {};

			// State of game
			state.seed = Math.floor(Math.random() * 10000 + 1);
			state.index = 0;
			state.shuffledDecks = null;
			state.currentSet = null;
			state.round = 0;
			state.deckLog = [];
			state.history = [];
			state.shuffled = false;
			state.plans = [ plan1, plan2, plan3 ];
			state.plansApproved = [ false, false, false ];

			// let gameId = Math.random().toString(36).substr(2, 9);
			if (gameId === undefined) gameId = 'default';
			let saved = await saveState(db, gameId, state, name);
			console.log('Init saved:', saved);
			return updateState(db, gameId);
		})
		.catch((error) => {
			console.log(error);
			return false;
		});
};
