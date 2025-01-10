const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');  // Import CORS package
const app = express();
const allowedOrigins = ['http://localhost:3000', 'http://192.168.1.66:3000'];
// Enable CORS for all origins (You can limit to specific origins later if needed)
app.use(cors({
  origin: function(origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {  // !origin is to allow no-origin requests (like Postman)
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
}));

app.use(express.json());

const db = new sqlite3.Database('./wesports.db', sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    console.error('Failed to connect to database:', err.message);
  }
});

// Endpoint to validate login
app.post('/api/login', (req, res) => {
  const { email, pin } = req.body;

  console.log('Login request received:', { email, pin }); // Log the incoming request data
 
  if (!email || !pin) {
    return res.status(400).json({ error: 'Email and PIN are required' });
  }

  db.get('SELECT * FROM users WHERE email = ? AND pin = ?', [email, pin], (err, row) => {
    if (err) {
      console.error('Database error:', err.message); // Log database error
      return res.status(500).json({ error: 'Database error' });
    }

    if (row) {
      console.log('User found:', row); // Log user data
      return res.json({ success: true, user: row });
    } else {
      console.log('No user found with the provided email and pin');
      return res.status(401).json({ error: 'Invalid email or PIN' });
    }
  });
});

// Assuming you have the session or some kind of token stored (e.g., in memory or cookies)
// For now, we'll check the session by looking at a simple flag (isAuthenticated)

// Sample session validation (you can implement proper session or token validation here)
app.get('/api/validate-session', (req, res) => {
  // You can check for a session or some other indicator, like a JWT token in headers
  // For simplicity, let's assume the user is authenticated if we have a `user` object in a mock session

  const user = { // This would typically be retrieved from your session or token
    id: 1,
    fullName: 'Socrates',
    email: 'socrates@run4more.gr',
    role: 'Philosopher',
  };

  if (user) {
    return res.json({ success: true, user });
  } else {
    return res.status(401).json({ error: 'User not authenticated' });
  }
});


app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});
