const express = require("express");
const path = require("path");

const app = express();
app.use(express.json());

// Serve static files from root directory
app.use(express.static(__dirname));

// Test route
app.get('/test', (req, res) => {
    res.json({ message: 'Server is working!', timestamp: new Date().toISOString() });
});

// Health check
app.get('/health', (req, res) => {
    res.json({ status: 'OK', files: ['wards.json', 'script.js', 'style.css'] });
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Simple test server running on http://localhost:${PORT}`);
});

module.exports = app;
