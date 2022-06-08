//Dependencies
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();



// cors
var corsOptions = {
    origin: 'https://localhost:8030'
}

// Middleware
app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({extended: true }));

// routers
// blog router
const blog_router = require('./routers/blogRoutes.js');

app.use('/api/v1/posts', blog_router);

// user router
const user_router = require('./routers/userRoutes.js');

app.use('/api/v1/users', user_router);

// test router
// const test_router = require('./routers/testRoutes.js');

// app.use('/api/tests', test_router);

//port
const PORT = process.env.PORT || 3000;

// Handling Errors
app.use((err, req, res, next) => {
    // console.log(err);
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";
    res.status(err.statusCode).json({
      message: err.message,
    });
});
//Server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})

