const health = require('./health');

const getState = require('./getState');
const setState = require('./setState');
const getHistory = require('./getHistory');
const setPlans = require('./setPlans');
const updateState = require('./updateState');
const initialize = require('./initState');
const resetState = require('./resetState');

// Initialize app
let state = initialize();

// Set up card decks
state = updateState(state);

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
