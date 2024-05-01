/*
Problem Statement: Create an Express application that serves static files (e.g., HTML, CSS, images) from a "public" directory. 
Ensure that accessing the root ("/") returns the "index.html" file from the "public" directory.
*/
const express = require('express');
const path = require('path');

function staticFileServer(req, res) {
  const app = express();
  
  app.use(express.static(path.join(__dirname, 'public')));
  
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  });

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}


staticFileServer();
