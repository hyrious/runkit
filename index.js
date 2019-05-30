require('dotenv').config()
const http = require('http')
const title = process.argv[2] || 'playground'
const endpoint = require('./' + title).endpoint
const port = process.env.PORT || 80
const opn = require('opn')


process.title = title
http.createServer(endpoint)
  .listen(port, () => {
    console.log('http://localhost:' + port + ' ' + title)
    opn('http://localhost:' + port)
  })
