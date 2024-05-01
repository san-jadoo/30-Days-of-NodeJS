function requestLoggerMiddleware(req, res, next) {
  const timestamp = new Date().toISOString(); 
  const method = req.method; 
  console.log(`${timestamp} - ${method} request received`);

  next(); 
}

function requestLoggerMiddleware(req, res, next) {
  const timestamp = new Date().toISOString(); 
  const method = req.method; 

  console.log(`${timestamp} - ${method} request received`);

  next(); 
}


const express = require('express');
const app = express();

app.use(requestLoggerMiddleware);


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});