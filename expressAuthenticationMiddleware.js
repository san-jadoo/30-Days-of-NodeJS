const express = require('express');
const jwt = require('jsonwebtoken');

const authenticationMiddleware = require('./authenticationMiddleware');

const app = express();

app.use(express.json());

const JWT_SECRET = 'your_jwt_secret';
app.get('/protected', authenticationMiddleware, (req, res) => {
  res.send(`Welcome ${req.user.username}!`);
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
