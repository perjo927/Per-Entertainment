const assert = require('assert');
const games = require('./games/game-list');

describe('As a developer I want to be able to create an instance of a game so that I can serve it to the client', () => {
    const game = games[0];

    describe('Given that I get a new round', () => {
        const gameRound = game.getNewRound();

        describe('When I receive the outcome', () => {
            const results = gameRound.outcome;

            it('Then it should give me an array of results', () => {
                assert.equal(3, results.length);
            });
        });
    });
});
