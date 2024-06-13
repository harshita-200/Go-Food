const express = require('express');
const cors = require('cors');
const app = express();

const setupCors = () => {
  app.use(cors({
    origin: 'https://go-food-zeta.vercel.app',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  }));
};

module.exports = setupCors;
