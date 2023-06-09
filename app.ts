import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import limiter from './utils/limiter';

import userRouter from './Routes/userRoutes';
import articleRouter from './Routes/articleRoutes';

import globeErrorHandler from './controllers/errorControllers';

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());

app.use(helmet());
app.use(cors());

app.use(limiter);

//router
app.use('/api/v1/users', userRouter);
app.use('/api/v1/article', articleRouter);

//Error
app.use(globeErrorHandler);

export default app;
