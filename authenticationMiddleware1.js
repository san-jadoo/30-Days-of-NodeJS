const express = require('express');
const app = express();
function authenticateAndAuthorize(requiredRole) {
  return (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const token = authHeader.split(' ')[1];
    try {
      const decoded = verifyToken(token);
      req.user = decoded;
    } catch (err) {
      return res.status(401).json({ message: "Invalid token" });
    }

    if (requiredRole && req.user.role !== requiredRole) {
      return res.status(403).json({ message: "Forbidden" });
    }


    next();
  };
}

function verifyToken(token) {
  throw new Error("Token verification not implemented");
}

app.get("/admin", authenticateAndAuthorize("admin"), (req, res) => {
  res.json({ message: "Welcome Admin!" });
});

app.listen(3000);