const http = require('http');
// import module
const route = require('./route');

// * create server
// เรียกใช้ module route
const server = http.createServer(route.requestHandler);

// * listen server
server.listen(3000);