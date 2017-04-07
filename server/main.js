var express = require('express')
var app = express()

// http://localhost:3000/images/0.jpg
app.use(express.static('public'))

// TODO: handlers
app.get('/', (req, res) => res.send('Welcome to Per Entertainment!'))
app.get('/game/:id', (req, res) => res.send(req.params))
app.get('/game/:id/play', (req, res) => res.send({
  "outcome": [0,1,2],
  "winType": "noWin",
  "bonus": false
}))

/**
 * Serve resources
 * Calculate outcome, 3 integers: [0, 0, 0]
 * Type of win: (No Win, Small Win, Big Win)
   ** Two equal integers = Small Win. Three equal integers = Big Win.
 * Randomly (in addition to outcome) return if bonus feature should be triggered or not.
 * 
 */

app.listen(3000, () => console.log('Entertainment served on port 3000'))