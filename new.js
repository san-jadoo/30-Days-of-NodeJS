const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();
const port = 3000;

// Sample users data
const users = [
  { id: 1, username: 'user1', password: 'password1' },
  { id: 2, username: 'user2', password: 'password2' }
];

// Secret key for JWT
const secretKey = 'your_secret_key';

// Authentication middleware
function authenticationMiddleware(req, res, next) {
  // Get the JWT token from the request headers
  const token = req.headers.authorization;

  // Check if token is present
  if (!token) {
    // If token is not present, return 401 Unauthorized status
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }

  // Verify the token
  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      // If token is invalid, return 401 Unauthorized status
      return res.status(401).json({ message: 'Unauthorized: Invalid token' });
    } else {
      // If token is valid, set the decoded token in request object and proceed
      req.decoded = decoded;
      next();
    }
  });
}

// Login route to generate JWT
app.post('/login', (req, res) => {
  // Sample authentication logic (just for demonstration)
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);

  if (user) {
    // Generate JWT token
    const token = jwt.sign({ username: user.username, id: user.id }, secretKey, { expiresIn: '1h' });
    res.json({ token });
  } else {
    res.status(401).json({ message: 'Authentication failed' });
  }
});

// Protected route
app.get('/protected-route', authenticationMiddleware, (req, res) => {
  res.json({ message: 'Access granted' });
});

// Error handler middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
