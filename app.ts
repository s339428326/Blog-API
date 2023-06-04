import express from 'express';

const morgan = require('morgan');

const userRouter = require('./Routes/userRoutes');
const GlobeErrorHandler = require('./controllers/errorControllers');

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());

app.get('/', (_req, res) => {
  res.send('<h1>Blog API</h1>');
});

//router
app.use('/api/v1/users', userRouter);

//Error
app.use(GlobeErrorHandler);

module.exports = app;
