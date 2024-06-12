const express = require('express');
const cors = require('cors');
const app = express();

// Use default settings to allow all origins
app.use(cors());

// Or configure specific settings
app.use(cors({
  origin: 'https://example.com', // Allow only this origin
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow these methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allow these headers
  credentials: true, // Allow credentials
}));

app.get('/api/data', (req, res) => {
  res.json({ message: 'This is CORS-enabled for a single origin.' });
});

app.listen(3000, () => {
  console.log('CORS-enabled web server listening on port 3000');
});
