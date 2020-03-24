module.exports = (seed) => {
    // console.log(seed);

    // Load cards JSON with data of game cards
    const cards = require('./cards.json');

    if (seed === undefined) {
        seed = Math.floor(Math.random() * 10000 + 1);
    }

    // State of game
    const state = {
        seed: seed,
        index: 0,
        cards: cards,
        shuffledDecks: null,
        currentSet: null,
        round: 0,
        deckLog: [],
        history: [],
        shuffled: false
    };

    return state;
};
