const http = require('http');
const url = require('url');
const topic = require('./lib/topic');
const db = require('./lib/db');

db.connect();

const app = http.createServer((request, response) => {
    const _url = request.url;
    const queryData = url.parse(_url, true).query;
    const pathname = url.parse(_url, true).pathname;

    if (pathname === '/') {
        if (queryData.id === undefined) {
            topic.home(request, response);
        }
        else {
            response.writeHead(302, {Location: '/'});
            response.end();
        }
    }
    else if (pathname === '/reserving') {
        topic.reserving(request, response);
    }
    else if (pathname === '/add_food') {
        topic.add_food(request, response);
    }
    else if (pathname === '/reserving_process') {
        topic.reserving_process(request, response);
    }
});

app.listen(3000);