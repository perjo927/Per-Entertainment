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

module.exports = app;