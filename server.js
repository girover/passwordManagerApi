const http = require('http');
const app = require('./app');

const port = process.env.HTTP_PORT || 3300;
const server = http.createServer(app);

server.listen(port);