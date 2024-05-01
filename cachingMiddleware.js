const cache = {};
function cachingMiddleware(req, res, next) {
  const url = req.originalUrl || req.url;
  
  if (cache[url] && cache[url].expirationTime > Date.now()) {
    res.send(cache[url].data); 
    return;
  }

  const originalSend = res.send;
  res.send = function (data) {
    cache[url] = {
      data: data,
      expirationTime: Date.now() + (cacheExpirationTime * 1000)
    };
    originalSend.call(this, data);
  };

  next();
}
const cacheExpirationTime = 60;

const express = require('express');
const app = express();

app.use(cachingMiddleware);

app.get('/', (req, res) => {
  res.send('Response from server');
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
