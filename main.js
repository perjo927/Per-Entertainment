var express = require('express')
var app = express()

// http://localhost:3000/images/0.jpg
app.use(express.static('public'))

app.get('/', (req, res) => res.send('Welcome to Per Entertainment!'))

app.listen(3000, () => console.log('App listening on port 3000'))