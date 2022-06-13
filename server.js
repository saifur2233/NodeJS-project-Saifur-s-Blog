//Dependencies
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cors = require('cors');
const dotenv = require('dotenv').config();
const AppError = require('./utilities/appError.js');
const globalErrorHandler = require('./controllers/errorController.js');
const app = express();


// cors
var corsOptions = {
    origin: 'https://localhost:8030'
}

// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({extended: true }));

// blog router
const blog_router = require('./routers/blogRoutes.js');
app.use('/api/v1/posts', blog_router);

// user router
const user_router = require('./routers/userRoutes.js');
app.use('/api/v1/users', user_router);

const auth_router = require('./routers/authRoutes');
app.use('/api/v1', auth_router);

const testRouter = require('./routers/testRoutes');
app.use('/api/v1', testRouter);

const PORT = process.env.PORT || 3000;

app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})

