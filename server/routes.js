
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
    playNewGameRound: function (req, res) {
        const { id } = req.params;

        const callContext = this;
        const game = callContext.games[id - 1];
        // if no game empty, throw 500!, no game available
        if (!game) {
            throw { name: "ServerException", message: "Game not available" };
        }

        const gameRound = game.getNewRound();

        res.send(gameRound);
    },
    notFound: (req, res, next) => {
        res.status(404).send("404 Not Found Exception");
    },
    serverException: (err, req, res, next) => {
        res.status(500).send("500 Server Exception");
    }
}