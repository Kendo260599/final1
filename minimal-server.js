// Simplest possible HTTP server test
const http = require('http');

const server = http.createServer((req, res) => {
    console.log(`Request: ${req.method} ${req.url}`);
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello World!\n');
});

server.listen(3003, () => {
    console.log('Server listening on port 3003');
});

// Auto-stop after 30 seconds
setTimeout(() => {
    console.log('Auto-stopping server...');
    server.close();
    process.exit(0);
}, 30000);
