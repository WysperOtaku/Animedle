import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import path from 'path';
import limiter from './middleware/rateLimiter';
import logger from './middleware/pinoLogger';
import fileNotFound from './middleware/fileNotFound';
import challengeRouter from './routes/challenge.routes';

const app = express();

app.disable('x-powered-by');

app.use(express.json());

app.use(cors({ origin: '*', optionsSuccessStatus: 200 }));

app.use(limiter);

app.use(helmet());

app.use(logger);

app.use('/uploads', express.static(path.join(__dirname, '../public/uploads')));

app.use('/uploads', fileNotFound);

app.use('/api/v0', challengeRouter);

export default app;
