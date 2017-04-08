const Game = require('./Game.contract')

class SimpleGame extends Game {     

    constructor(gameConfiguration) {
        super(gameConfiguration);
    }

    static _isFreeGameRound() {
        let coinFlip = this._getRandomNumber(0, 1);
        return coinFlip === 1;
    }

    _getWinType(gameResults) {
        let wins = 0;
        let game = this._gameConfiguration;        

        for (let symbol of gameResults) {
            if (symbol) {
                // wins++;
            }
        }

        return game.winTypes[wins];
    }

    getNewRound() {
        let gameResults = [];        
        let game = this._gameConfiguration;

        for (let i = 0; i < game.columns; i++) {
            gameResults.push(this.constructor._getRandomNumber(0, game.symbolsRange));
        }

        return {
            "outcome": gameResults,
            "winType": this._getWinType(gameResults),
            "bonus": this.constructor._isFreeGameRound()
        };
    }
}

module.exports = SimpleGame;