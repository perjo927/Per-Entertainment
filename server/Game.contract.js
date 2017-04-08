class Game {

    constructor(gameConfiguration = null) {
        if (new.target === Game) {
            throw new TypeError("Cannot construct Abstract instances directly");
        }
        if (gameConfiguration) {
            this._gameConfiguration = gameConfiguration;
        } else {
            throw { name: "RequiredParameterException", message: "Missing Game Configuration" };
        }
    }

    get id() {
        return this._gameConfiguration.id;
    }

    get resources() {
        return this._gameConfiguration.resources;
    }

    static _getRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    getNewRound() {
        throw { name: "NotImplementedException", message: "Child class must implement getNewRound()" };
    }
}

module.exports = Game;