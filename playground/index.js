const fetch = require("node-fetch");

exports.endpoint = function(request, response) {
    if (request.url.includes('favicon')) {
        response.statusCode = 404;
        response.end('Not found');
    }
    fetch('https://jsonbin.org/hyrious/play', {
        method: 'GET',
        headers: {
            authorization: 'token ' + process.env.JSONBIN_TOKEN,
        },
    }).then(res => res.json()).then(res => {
        fetch('https://jsonbin.org/hyrious/play', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                authorization: 'token ' + process.env.JSONBIN_TOKEN,
            },
            body: JSON.stringify({ value: res.value + 1 }),
        }).then(r => r.json()).then(r => {
            response.end('Count: ' + r.value);
        });
    });
}
