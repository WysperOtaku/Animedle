import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import testRouter from './routes/testRouter';
import limiter from './middleware/rateLimiter';
import logger from './middleware/pinoLogger';

const app = express();

app.disable('x-powered-by');

app.use(express.json());

app.use(cors({ origin: '*', optionsSuccessStatus: 200 }));

app.use(limiter);

app.use(helmet());

app.use(logger);

app.use(testRouter);

export default app;
