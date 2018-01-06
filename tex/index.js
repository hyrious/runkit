const { post, get } = require('axios')
const { json, send } = require('micro')
const { parse } = require('querystring')
const api = 'https://en.wikipedia.org/api/rest_v1/media/math/check/tex'
exports.endpoint = async (req, res) => {
    let q = parse(req.url.replace(/^\/?\?/, ''))
    try { q = Object.assign(q, await json(req)) } catch (err) {}
    let format = q.format || 'svg'
    if (!('q' in q))
        return res.end('<pre>POST / { q[, format=svg|png|mml] } => data</pre>');
    try {
        let { headers: { 'x-resource-location': id } } = await post(api, q, { headers: { 'Accept': 'application/json', 'User-Agent': 'Runkit endpoint from hyrious <hyrious@outlook.com>.' } })
        let { data } = await get(`https://en.wikipedia.org/api/rest_v1/media/math/render/${format}/${id}`)
        res.setHeader('Content-Type', 'image/svg+xml')
        send(res, 200, data)
    } catch (err) {
        res.setHeader('Content-Type', 'application/json')
        send(res, 200, { error: 'unexpected input', q: q.q })
    }
}
