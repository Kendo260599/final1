const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    
    // CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    if (req.url === '/test') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ 
            message: 'Basic server working!', 
            timestamp: new Date().toISOString(),
            url: req.url 
        }));
        return;
    }
    
    if (req.url === '/data/wards.json') {
        const filePath = path.join(__dirname, 'data/wards.json');
        if (fs.existsSync(filePath)) {
            const content = fs.readFileSync(filePath, 'utf8');
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(content);
        } else {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('File not found');
        }
        return;
    }
    
    if (req.url === '/' || req.url === '/index.html') {
        const filePath = path.join(__dirname, 'index.html');
        if (fs.existsSync(filePath)) {
            const content = fs.readFileSync(filePath, 'utf8');
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(content);
        } else {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('Index file not found');
        }
        return;
    }
    
    // Try to serve static files
    const filePath = path.join(__dirname, req.url);
    if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
        const ext = path.extname(filePath);
        const contentTypes = {
            '.html': 'text/html',
            '.js': 'application/javascript',
            '.css': 'text/css',
            '.json': 'application/json',
            '.mjs': 'application/javascript'
        };
        
        const contentType = contentTypes[ext] || 'text/plain';
        const content = fs.readFileSync(filePath, 'utf8');
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(content);
        return;
    }
    
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not found');
});

const PORT = 3002;
server.listen(PORT, () => {
    console.log(`Basic HTTP server running on http://localhost:${PORT}`);
    console.log('Available endpoints:');
    console.log('  - GET /test');
    console.log('  - GET /data/wards.json');
    console.log('  - GET / (index.html)');
});

server.on('error', (err) => {
    console.error('Server error:', err);
});

module.exports = server;
