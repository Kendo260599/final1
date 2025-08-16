// Simple Express debug server
const express = require('express');
const path = require('path');

const app = express();

// Add error handling
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
});

// Serve static files  
app.use(express.static(__dirname));

// Simple test route
app.get('/test', (req, res) => {
    res.json({ message: 'Express working!', timestamp: new Date().toISOString() });
});

// Error handler
app.use((err, req, res, next) => {
    console.error('Express error:', err);
    res.status(500).json({ error: 'Internal server error' });
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Debug Express server running on http://localhost:${PORT}`);
}).on('error', (err) => {
    console.error('Server error:', err);
});

process.on('uncaughtException', (err) => {
    console.error('Uncaught exception:', err);
    process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled rejection at:', promise, 'reason:', reason);
    process.exit(1);
});
