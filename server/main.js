const routes = require('./routes');
const games = require('./games/game-list');

const express = require('express');
const app = express();

app.all('/', (req, res, next) => {
  routes.allow(res);
  next();
});

app.all('/game/:id', (req, res, next) => {
  routes.allow(res);
  next();
});

app.all('/game/:id/newround', (req, res, next) => {
  routes.allow(res);
  next();
});

/**
 *  ROUTES
 * 
 * 1. Serve resources
 * 2. Calculate outcome, 3 integers: [0, 0, 0]
 *    2.1. Type of win: (No Win, Small Win, Big Win)
 *    2.2 Two equal integers = Small Win. Three equal integers = Big Win.
 *    2.3. Randomly (in addition to outcome) return if bonus feature should be triggered or not. 
 */
app.get('/', routes.home);
app.get('/game/:id', routes.getGame.bind({ games: games }));
app.get('/game/:id/newround', routes.playNewGameRound.bind({ games: games }));

app.listen(3000, () => console.log('Entertainment served on port 3000'));

app.use((req, res, next) => {
  routes.allow(res);
  next();
});
app.use(express.static('public'));
app.use(routes.notFound);
app.use(routes.serverException);
