const health = require('./health');

require('dotenv').config();
const pgp = require('pg-promise')({
	/* initialization options */
	capSQL: true // capitalize all generated SQL
});

const getState = require('./getState');
const setState = require('./setState');
const getHistory = require('./getHistory');
const setPlans = require('./setPlans');
const initialize = require('./initState');
const resetState = require('./resetState');

const db = require('./db')();

// loadCardsInDB();
// loadPlansInDB();

// State of game
let state = {};

// Initialize app
initialize(state, db);
console.log(state);

module.exports = (app) => {
	app.use((req, res, next) => {
		req.db = db;
		next();
	});

	app.get('/welcome-api/_health', health);
	app.get('/welcome-api/state', (req, res) => getState(req, res, state));
	app.get('/welcome-api/next', (req, res) => setState(req, res, state));
	app.get('/welcome-api/history', (req, res) => getHistory(req, res, state));
	app.get('/welcome-api/plans', (req, res) => setPlans(req, res, state));
	app.get('/welcome-api/reset', (req, res) => resetState(req, res, state));
	// app.get('/welcome-api/:gameId/reset', (req, res) => resetState(req, res, state));
};

function loadCardsInDB() {
	// Load cards into DB
	let cards = require('./cards.json');
	// console.log(cards);

	const card_cs = new pgp.helpers.ColumnSet([ 'card' ], { table: 'cards' });
	const card_query = pgp.helpers.insert(cards, card_cs);
	db
		.none(card_query)
		.then((data) => {
			// success, data = null
			console.log('Cards in DB');
		})
		.catch((error) => {
			console.log(error);
			// error;
		});
}

function loadPlansInDB() {
	// Load plans into DB
	let plans = require('./plans.json');
	// console.log(plans);

	const plan_cs = new pgp.helpers.ColumnSet([ 'plan' ], { table: 'plans' });
	const plan_query = pgp.helpers.insert(plans, plan_cs);
	db
		.none(plan_query)
		.then((data) => {
			// success, data = null
			console.log('Plans in DB');
		})
		.catch((error) => {
			console.log(error);
			// error;
		});
}
