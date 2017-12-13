const http = require('http')
const title = process.argv[2] || 'playground'
const entry = require('./' + title)
const port = process.env.PORT || 80

http.createServer(entry.endpoint)
    .listen(80, () => console.log('http://localhost ' + title))
