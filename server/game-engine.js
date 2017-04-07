class Game {

    gameId;
    winTypes = [
        "No Win",
        "Small Win",
        "Big Win"
    ];    

    constructor(gameId = null) {
        this.gameId = gameId;
    }

    getWin(outcome) {
        for (let o of outcome) {
            if (o) {
                
            }
        }
    }

    static calculateOutcome() {
        let outcome = [];        

        for (let i = 0; i <3; i++) {
            outcome.push(Math.floor((Math.random() * 5) + 1));
        }

        const win = this.getWin(outcome);

        return {
            "outcome": outcome,
            "win": win
        };
    }
}

module.exports = (id) => {
    new Game(id);
}