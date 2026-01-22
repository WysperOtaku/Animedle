import express from 'express';
import morgan from 'morgan';
import challengeRouter from './routes/challenge.routes';

const app = express();

app.use(morgan('dev'));

app.use("/api/v0", challengeRouter);

export default app;
