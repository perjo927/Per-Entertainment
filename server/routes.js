class Routes {

}

module.exports = {
    home: (req, res) => res.send('Welcome to Per Entertainment!'),
    getGame: (req, res) => {
        res.send(req.params.id);
        // TODO: serve games resources
    },
    playNewGameRound: (req, res) => res.send({
        "outcome": [0, 1, 2],
        "winType": "noWin",
        "bonus": false
    })
}