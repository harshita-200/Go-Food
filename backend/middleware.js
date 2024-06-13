const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors({
  origin: 'https://go-food-zeta.vercel.app/',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));

// Your routes and middleware here

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
