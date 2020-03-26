const health = require('./health');

const getState = require('./getState');
const setState = require('./setState');
const getHistory = require('./getHistory');
const setPlans = require('./setPlans');
const initialize = require('./initState');
const resetState = require('./resetState');

const getDb = require('./db');
const db = getDb();

// // Load cards into DB
// let cards = require('./cards.json');
// // console.log(cards);
// db.query('INSERT INTO resources (item) VALUES(${this:json})', { cards });

// Load plans into DB
let plans = require('./plans.json');
// console.log(plans);
db.query('INSERT INTO resources (item) VALUES(${this:json})', { plans });

// State of game
let state = {};

// Initialize app
state = initialize(state);

// console.log(state);

module.exports = (app) => {
	app.get('/welcome-api/_health', health);
	app.get('/welcome-api/state', (req, res) => getState(req, res, state));
	app.get('/welcome-api/next', (req, res) => setState(req, res, state));
	app.get('/welcome-api/history', (req, res) => getHistory(req, res, state));
	app.get('/welcome-api/plans', (req, res) => setPlans(req, res, state));
	app.get('/welcome-api/reset', (req, res) => resetState(req, res, state));
	// app.get('/welcome-api/:gameId/reset', (req, res) => resetState(req, res, state));
};
