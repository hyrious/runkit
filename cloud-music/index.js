function encrypt(obj) {
  const crypto = require('crypto')
  const bigint = require('big-integer')
  const modulus = '00e0b509f6259df8642dbc35662901477df22677ec152b5ff68ace615bb7b725152b3ab17a876aea8a5aa76d2e417629ec4ee341f56135fccf695280104e0312ecbda92557c93870114af6c9d05c4f7f0c3685b7a46bee255932575cce10b424d813cfe4875d3e82047b97ddef52741d546b8e289dc6935b3ece0462db0a22b8e7'
  const nonce = '0CoJUm6Qyw8W8jud'
  const pubkey = '010001'
  function createSecretKey(size) {
    const keys = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    const ret = new Array(size)
    for (let i = 0; i < size; ++i)
      ret[i] = keys.charAt(Math.floor(Math.random() * keys.length))
    return ret.join('')
  }
  function aesEncrypt(text, secret) {
    const iv = new Buffer('0102030405060708', 'binary')
    const key = new Buffer(secret, 'binary')
    const cipher = crypto.createCipheriv('AES-128-CBC', key, iv)
    let encrypted = cipher.update(text, 'utf8', 'base64')
    encrypted += cipher.final('base64')
    return encrypted
  }
  function rsaEncrypt(text, pubkey, modulus) {
    const biText = bigint(text.split('').reverse().map(c => c.charCodeAt(0).toString(16)).join(''), 16)
    const biEx = bigint(pubkey, 16)
    const biMod = bigint(modulus, 16)
    const biRet = biText.modPow(biEx, biMod)
    return biRet.toString(16).padStart(256, '0')
  }
  const text = JSON.stringify(obj)
  const secret = createSecretKey(16)
  const params = aesEncrypt(aesEncrypt(text, nonce), secret)
  const encSecKey = rsaEncrypt(secret, pubkey, modulus)
  return { params, encSecKey }
}
function randUA() {
  const UAs = [
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Safari/537.36',
  'Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1',
  'Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1',
  'Mozilla/5.0 (Linux; Android 5.0; SM-G900P Build/LRX21T) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Mobile Safari/537.36',
  'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Mobile Safari/537.36',
  'Mozilla/5.0 (Linux; Android 5.1.1; Nexus 6 Build/LYZ28E) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Mobile Safari/537.36',
  'Mozilla/5.0 (iPhone; CPU iPhone OS 10_3_2 like Mac OS X) AppleWebKit/603.2.4 (KHTML, like Gecko) Mobile/14F89;GameHelper',
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_5) AppleWebKit/603.2.4 (KHTML, like Gecko) Version/10.1.1 Safari/603.2.4',
  'Mozilla/5.0 (iPhone; CPU iPhone OS 10_0 like Mac OS X) AppleWebKit/602.1.38 (KHTML, like Gecko) Version/10.0 Mobile/14A300 Safari/602.1',
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36',
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.12; rv:46.0) Gecko/20100101 Firefox/46.0',
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:46.0) Gecko/20100101 Firefox/46.0',
  'Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 6.0)',
  'Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.0; Trident/4.0)',
  'Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; Trident/5.0)',
  'Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Win64; x64; Trident/6.0)',
  'Mozilla/5.0 (Windows NT 6.3; Win64, x64; Trident/7.0; rv:11.0) like Gecko',
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.135 Safari/537.36 Edge/13.10586',
  'Mozilla/5.0 (iPad; CPU OS 10_0 like Mac OS X) AppleWebKit/602.1.38 (KHTML, like Gecko) Version/10.0 Mobile/14A300 Safari/602.1'
  ]
  return UAs[Math.floor(Math.random() * UAs.length)]
}
function createWebAPIRequest(
  host,
  path,
  method,
  data,
  cookie,
  callback,
  errorcallback
) {
  const http = require('http')
  const querystring = require('querystring')
  let music_req = ''
  const cryptoreq = encrypt(data)
  const http_client = http.request(
    {
      hostname: host,
      method: method,
      path: path,
      headers: {
        Accept: '*/*',
        'X-Real-IP':'211.161.244.70',
        'Accept-Language': 'zh-CN,zh;q=0.8,gl;q=0.6,zh-TW;q=0.4',
        Connection: 'keep-alive',
        'Content-Type': 'application/x-www-form-urlencoded',
        Referer: 'http://music.163.com',
        Host: 'music.163.com',
        Cookie: cookie,
        'User-Agent': randUA()
      }
    },
    function(res) {
      res.on('error', function(err) {
        errorcallback(err)
      })
      res.setEncoding('utf8')
      if (res.statusCode != 200) {
        createWebAPIRequest(host, path, method, data, cookie, callback)
        return
      } else {
        res.on('data', function(chunk) {
          music_req += chunk
        })
        res.on('end', function() {
          if (music_req == '') {
            createWebAPIRequest(host, path, method, data, cookie, callback)
            return
          }
          if (res.headers['set-cookie']) {
            callback(music_req, res.headers['set-cookie'])
          } else {
            callback(music_req)
          }
        })
      }
    }
  )
  http_client.write(
    querystring.stringify({
      params: cryptoreq.params,
      encSecKey: cryptoreq.encSecKey
    })
  )
  http_client.end()
}
function getPlaylistDetail(id) {
  return new Promise((resolve, reject) => {
    const cookie = ''
    let detail, imgurl
    const data = {
      id,
      offset: 0,
      total: true,
      limit: 1000,
      n: 1000,
      csrf_token: ''
    }
    createWebAPIRequest(
      'music.163.com',
      '/weapi/v3/playlist/detail',
      'POST',
      data,
      cookie,
      music_req => {
        resolve(music_req)
      },
      err => {
        reject('{"error":"fetch error"}')
      }
    )
  })
}
function getMusicUrl(ids) {
  return new Promise((resolve, reject) => {
    const cookie = 'os=uwp;'
    const data = {
      ids,
      br: 999000,
      csrf_token: ''
    }
    createWebAPIRequest(
      'music.163.com',
      '/weapi/song/enhance/player/url',
      'POST',
      data,
      cookie,
      music_req => {
        resolve(music_req)
      },
      err => {
        reject('{"error":"fetch error"}')
      }
    )
  })
}

exports.endpoint = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  const id = Number((req.url.match(/\d+/)||[NaN])[0])
  if (!id) { res.end('<pre>GET / { id } => musics</pre>'); return }
  res.setHeader('Content-Type', 'application/json')
  try {
    const data = JSON.parse(await getPlaylistDetail(id))
    const ids = data.playlist.trackIds.map(({ id, v }) => id)
    data.musics = JSON.parse(await getMusicUrl(ids))
    res.end(JSON.stringify(data))
  } catch (reason) {
    res.statusCode = 502
    res.end('{"error":"fetch error"}')
  }
}
