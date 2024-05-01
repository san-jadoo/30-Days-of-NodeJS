const express = require('express');
const app = express();

app.get('/error', (req, res, next) => {
    
    const error = new Error('Sample error');
    error.statusCode = 400;
    next(error);
});

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    
    res.status(statusCode);

    res.json({
        error: {
            message: err.message || 'Internal Server Error',
            statusCode: statusCode
        }
    });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
