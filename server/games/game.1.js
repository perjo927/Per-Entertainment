const GameConfiguration = require('../GameConfiguration');

const resources = {
    symbols: [
        "images/0.jpg",
        "images/1.png",
        "images/2.png",
        "images/3.png",
        "images/4.png",
        "images/5.jpg",
    ],
    button: "images/button.png"
}


const configuration = new GameConfiguration("1", resources);
configuration.name = "Per's Quest";

module.exports = configuration;