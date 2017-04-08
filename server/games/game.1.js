const GameConfiguration = require('../GameConfiguration');

const resources = [
    "images/0.jpg"
];

const configuration = new GameConfiguration("1", resources);
configuration.name = "Per's Quest";

module.exports = configuration;