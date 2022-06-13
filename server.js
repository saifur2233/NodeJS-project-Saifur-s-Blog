const express = require('express');
const cors = require('cors');
require('dotenv').config();
const AppError = require('./utilities/appError.js');
const globalErrorHandler = require('./controllers/errorController.js');
const app = express();

const corsOptions = {
  origin: 'https://localhost:8030'
}

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const blogRouter = require('./routers/blogRoutes.js');
app.use('/api/v1/posts', blogRouter);

const userRouter = require('./routers/userRoutes.js');
app.use('/api/v1/users', userRouter);

const authRouter = require('./routers/authRoutes');
app.use('/api/v1', authRouter);

const PORT = process.env.PORT || 3000;

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
