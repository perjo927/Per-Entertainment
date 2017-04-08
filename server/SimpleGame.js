const Game = require('./Game.contract')

class SimpleGame extends Game {     

    constructor(gameConfiguration) {
        super(gameConfiguration);
    }

    static _isFreeGameRound() {
        let coinFlip = this._getRandomNumber(0, 1);
        return coinFlip === 1;
    }

    static _getWinType(gameResults) {
        let wins = 0;

        for (let symbol of gameResults) {
            if (symbol) {
                wins++;
            }
        }
        return this._gameConfiguration.winTypes[wins];
    }

    getNewRound() {
        let gameResults = [];        

        for (let i = 0; i < this._gameConfiguration.columns; i++) {
            gameResults.push(_getRandomNumber(0, this._gameConfiguration.symbolsRange));
        }

        const winType = this._getWinType(gameResults);

        return {
            "outcome": gameResults,
            "winType": winType,
            "bonus": this._isFreeGameRound()
        };
    }
}

module.exports = SimpleGame;