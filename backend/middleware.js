const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors({
  origin: 'http://localhost:5000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));

// Your routes and middleware here

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
