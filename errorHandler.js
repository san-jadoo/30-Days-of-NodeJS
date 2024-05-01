/*
Problem Statement: Create an Express route that throws an error if the request parameter "number" is not a positive integer.
 Implement an error handling middleware to catch and handle this specific error, returning a custom error message 
 and a 400 Bad Request status.
*/

const express = require('express');
const app = express();

function checkPositiveInteger(req, res, next) {
  const number = parseInt(req.query.number);
  if (Number.isInteger(number) && number > 0) {
    next();
  } else {
    const error = new Error('Number is not a positive integer');
    error.status = 400;
    next(error);
  }
}

app.get('/positive', checkPositiveInteger, function(req, res) {
  res.send('Success! The number is a positive integer.');
});

app.use(function(err, req, res, next) {
  if (err.status === 400) {
    res.status(400).send('Bad Request: ' + err.message);
  } else {
    next(err);
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
