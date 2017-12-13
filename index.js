require('dotenv').load()
const https = require('https')
const title = process.argv[2] || 'playground'
const endpoint = require('./' + title).endpoint
const port = process.env.PORT || 80
const { key, cert } = require('openssl-self-signed-certificate')

process.title = title
https.createServer({ key, cert }, endpoint)
  .listen(443, () => console.log('https://localhost ' + title))
