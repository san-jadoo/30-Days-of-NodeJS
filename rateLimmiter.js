/*
Problem Statement: Implement a rate-limiting middleware for an Express application. 
The middleware should limit the number of requests from a single IP address to a specified rate, and return a 429 Too Many Requests status if the limit is exceeded.
*/
const express = require('express');
const rateLimit = require('express-rate-limit');

const app = express();

const limiter = rateLimit({
  windowMs: 60000,
  max: 5,
  message: 'Too many requests per Minute, please try again later.'
});

app.get('/protected-route', limiter, (req, res) => {
  res.send('Day 12 of 30 days NodeJS');
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
