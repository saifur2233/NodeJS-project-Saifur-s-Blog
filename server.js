const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const AppError = require('./utilities/AppError.js');
const globalErrorHandler = require('./controllers/errorController.js');
const blogRouter = require('./routes/blogRoutes.js');
const userRouter = require('./routes/userRoutes.js');
const authRouter = require('./routes/authRoutes');
const connectdb = require('./models/index');
require('dotenv').config();
const app = express();
app.use(
  cors({
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true,
  })
);
connectdb.connect();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1/posts', blogRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1', authRouter);

app.all('/*', (req, res, next) => {
  return next(
    new AppError(`Can't find ${req.originalUrl} on this server!`, 404)
  );
});

app.use(globalErrorHandler);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
