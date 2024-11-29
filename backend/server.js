const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MySQL Connection
const db = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || '',
    database: process.env.DB_NAME || 'aptitude_test_db'
});

db.connect(err => {
    if (err) {
        console.error('Database connection failed:', err);
        return;
    }
    console.log('Connected to MySQL Database');
});

// Routes
// Registration Endpoint
app.post('/register', (req, res) => {
    const { name, email, number } = req.body;
    const query = 'INSERT INTO users (name, email, number) VALUES (?, ?, ?)';
    db.query(query, [name, email, number], (err, result) => {
        if (err) return res.status(400).json({ error: 'Registration Failed' });
        res.status(200).json({ message: 'Registration Successful' });
    });
});

// Test Submission Endpoint
app.post('/submit-test', (req, res) => {
    const { email, score } = req.body;
    const query = 'UPDATE users SET score = ? WHERE email = ?';
    db.query(query, [score, email], (err, result) => {
        if (err) return res.status(400).json({ error: 'Test Submission Failed' });
        res.status(200).json({ message: 'Test Submitted Successfully' });
    });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
