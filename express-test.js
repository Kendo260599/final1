const express = require('express');
const path = require('path');

const app = express();
const PORT = 3004;

// Simple test route
app.get('/test', (req, res) => {
    console.log('Test endpoint called');
    res.json({ 
        message: 'Express server working!', 
        timestamp: new Date().toISOString() 
    });
});

// Static files
app.use(express.static(__dirname));

// Main route
app.get('/', (req, res) => {
    console.log('Index requested');
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Express server running on http://localhost:${PORT}`);
});

// Auto-stop after 60 seconds
setTimeout(() => {
    console.log('Auto-stopping Express server...');
    process.exit(0);
}, 60000);
