const translate = require('translate-api')
exports.endpoint = (req, res) => {
    if (req.method == 'GET') {
        res.end('<pre><code>POST / { text[, from, to] } => text</code></pre>')
    }
    let data = ""
    req.on('data', x => data += x)
    req.on('end', () => {
        let { text, to, from } = JSON.parse(data)
        if (!to) to = 'zh-cn';
        if (!from) from = 'auto';
        translate.getText(text, { from, to })
        .then(({ text }) => res.end(text))
        .catch(e => res.end(e.code + ' ' + e))
    })
}
