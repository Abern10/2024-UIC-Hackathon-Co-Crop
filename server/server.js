const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const port = 3000;

// Set the path to the SQLite database file
const dbPath = path.join(__dirname, 'cocrop.db');

// Connect to the SQLite database using the correct file path
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error opening database:', err.message);
        return;
    }
    console.log('Connected to the database.');
});

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, '../public')));

// Endpoint to handle search queries
app.get('/search', (req, res) => {
    const searchTerm = req.query.term;
    // console.log(searchTerm);
});

// Start the server
app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});