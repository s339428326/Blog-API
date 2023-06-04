import express from 'express';

const morgan = require('morgan');

const userRouter = require('./Routes/userRoutes');
const globeErrorHandler = require('./controllers/errorControllers');

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());

//router
app.use('/api/v1/users', userRouter);

//Error
app.use(globeErrorHandler);

module.exports = app;
