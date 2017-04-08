const routes = require('./routes');

const express = require('express');
const app = express();


// GET from http://localhost:3000/images/0.jpg
app.use(express.static('public'));

// TODO: handler
app.get('/', routes.home);

// TODO: register route per game configuration id, in handler
app.get('/game/:id', routes.getGame);

// TODO: get from handler
app.get('/game/:id/newround', routes.playNewGameRound);

/**
 * Serve resources
 * Calculate outcome, 3 integers: [0, 0, 0]
 * Type of win: (No Win, Small Win, Big Win)
   ** Two equal integers = Small Win. Three equal integers = Big Win.
 * Randomly (in addition to outcome) return if bonus feature should be triggered or not.
 * 
 */

app.listen(3000, () => console.log('Entertainment served on port 3000'));