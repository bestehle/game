const health = require('./health');

const getState = require('./getState');
const setState = require('./setState');

const cards = getCards();
const state = { index: 26, cards: cards, currentSet: null };

module.exports = (app) => {
	app.get('/welcome-api/_health', health);
	app.get('/welcome-api/state', (req, res) => getState(req, res, state));
	app.get('/welcome-api/next', (req, res) => setState(req, res, state));
	// app.get('/welcome-api/:gameId/next', (req, res) => setState(req, res, state));
};

function getCards() {
	let cards = [
		[ 75, 30, 58 ],
		[ 18, 4, 52 ],
		[ 67, 64, 63 ],
		[ 54, 78, 11 ],
		[ 59, 23, 37 ],
		[ 16, 5, 12 ],
		[ 29, 34, 74 ],
		[ 10, 69, 48 ],
		[ 47, 73, 65 ],
		[ 53, 61, 20 ],
		[ 51, 14, 33 ],
		[ 44, 7, 13 ],
		[ 49, 3, 50 ],
		[ 68, 2, 35 ],
		[ 70, 60, 57 ],
		[ 39, 0, 40 ],
		[ 25, 1, 9 ],
		[ 31, 24, 77 ],
		[ 46, 41, 22 ],
		[ 45, 43, 19 ],
		[ 42, 80, 72 ],
		[ 32, 79, 66 ],
		[ 21, 8, 71 ],
		[ 28, 15, 36 ],
		[ 76, 17, 6 ],
		[ 62, 38, 26 ],
		[ 27, 56, 55 ]
	];
	return cards;
}
