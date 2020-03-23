const health = require('./health');

const getState = require('./getState');
const setState = require('./setState');
const getHistory = require('./getHistory');
const updateState = require('./updateState');
const cards = require('./cards.json');

// State of game
let state = {
	index: 0,
	cards: null,
	shuffledDecks: null,
	currentSet: null,
	round: 0,
	deckLog: [],
	history: [],
	shuffled: false
};

// Load cards JSON with data of game cards
state.cards = cards;

// Set up card decks
state = updateState(state);

// console.log(state);

module.exports = (app) => {
	app.get('/welcome-api/_health', health);
	app.get('/welcome-api/state', (req, res) => getState(req, res, state));
	app.get('/welcome-api/next', (req, res) => setState(req, res, state));
	app.get('/welcome-api/history', (req, res) => getHistory(req, res, state));
	// app.get('/welcome-api/:gameId/next', (req, res) => setState(req, res, state));
};
