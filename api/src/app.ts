import express from 'express';
import morgan from 'morgan';
import testRouter from './testRouter';

const app = express();

app.use(morgan('dev'));

app.use(testRouter);

export default app;
