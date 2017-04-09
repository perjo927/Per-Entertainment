require('babel-polyfill');
const assert = require('assert');
const Game = require('./game').Game;

describe('As a developer I want to be able to create an instance of a Game so that I can start spinning', () => {

    describe('Given that I have an instance of a game', () => {
        const game = new Game("http://foo", 1, "document");

        describe('When I get its ID', () => {
            const id = game._id;

            it('Then it should be 1', () => {
                assert.equal(1, id);
            });
        });
    });
});
