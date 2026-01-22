import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import limiter from './middleware/rateLimiter';
import logger from './middleware/pinoLogger';
import errorHandler from './middleware/errorHandler';
import challengeRouter from './routes/challenge.routes';

const app = express();

app.disable('x-powered-by');

app.use(express.json());

app.use(cors({ origin: '*', optionsSuccessStatus: 200 }));

app.use(limiter);

app.use(helmet());

app.use(logger);

app.use('/api/v0', challengeRouter);

// Error handler debe ir DESPUÉS de las rutas
app.use(errorHandler);

export default app;
