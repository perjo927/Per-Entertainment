
module.exports = {
    home: (req, res) => res.send('Welcome to Per Entertainment!'),
    getGame: function (req, res) {
        const { id } = req.params;
        
        const callContext = this;
        const game = callContext.games[id - 1];
        // if no game empty, throw 500!, no game available
        if (!game) {
            throw { name: "ServerException", message: "Game not available" };
        }

        res.send({
            host: `http://${req.headers.host}/`,
            resources: game.resources,
            name: game.name
        });
    },
    playNewGameRound: function(req, res) {
        const { id } = req.params;
        
        const callContext = this;
        const game = callContext.games[id - 1];
         // if no game empty, throw 500!, no game available
        if (!game) {
            throw { name: "ServerException", message: "Game not available" };
        }

        console.log(game)

        res.send({
            "outcome": [0, 1, 2],
            "winType": "noWin",
            "bonus": false
        });
    }
}