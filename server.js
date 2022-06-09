//Dependencies
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv').config();
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

// // auth router
// const _router = require('./routers/authRoutes');
// app.use('/api/v1/signup', _router);

// user router
const auth_router = require('./routers/authRoutes');
app.use('/api/v1', auth_router);

//port
const PORT = process.env.PORT || 3000;

// Handling Errors
const errorHandler = (err, req, res, next) => {
    // console.log(err);
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";
    res.status(err.statusCode).json({
      message: err.message,
    });
};

app.use(errorHandler);

//Server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})

