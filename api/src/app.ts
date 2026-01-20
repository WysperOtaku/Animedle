import express from 'express';
import morgan from 'morgan';
import testRouter from './routes/testRouter';

const app = express();

app.use(morgan('dev'));

app.use(testRouter);

export default app;
