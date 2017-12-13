const { send } = require('micro')
function frontend(res) {
    res.end('<h1>hello</h1>')
}
function backend(res) {
    send(res, 200, { count: 42 })
}
exports.endpoint = (req, res) => {
    if (req.method === 'GET') {
        frontend(res)
    } else if (req.method === 'POST') {
        backend(res)
    } else {
        send(res, 404, 'Not implemented')
    }
}
