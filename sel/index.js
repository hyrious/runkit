const { get } = require('axios');
const { send, json } = require('micro');
const cheerio = require('cheerio');
exports.endpoint = async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'text/json');
    if (req.method === 'GET') {
        if (req.url.endsWith('favicon.ico')) {
            res.statusCode = 404;
            return send(res, 404, '');
        }
        return send(res, 200, { post: '{ url, selector }', returns: '{ attr, text }' });
    }
    const { url, selector } = await json(req);
    console.log(url, selector);
    if (!url || !selector) return send(res, 404, '');
    const x = cheerio.load((await get(url)).data)(selector);
    return send(res, 200, { attr: x.attr(), text: x.text() });
};
