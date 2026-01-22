import PinoHttp from 'pino-http';
import pino from 'pino';

const transport = pino.transport({
  targets: [
    {
      target: 'pino-pretty',
      options: {
        destination: './../logs/exceotions.log',
        level: 'warn'
      }
    },
    {
      target: 'pino-pretty',
      options: {
        destination: process.stdout.fd
      }
    }
  ]
});

const pinoLogger = pino(
  {
    level: process.env.LOG_LEVEL || 'info'
  },
  transport
);

const logger = PinoHttp({
  logger: pinoLogger,

  serializers: {
    req: (req) => ({
      id: req.id,
      method: req.method,
      url: req.url
    }),
    res: (res) => ({ statusCode: res.statusCode })
  },

  customLogLevel: (_req, res, err) => {
    if (res.statusCode >= 400 && res.statusCode < 500)
      return 'warn';
    if (res.statusCode >= 500 || err) return 'error';
    return 'debug';
  },

  customSuccessMessage: (req, res) => {
    return `${req.method}   ${req.url} ${res.statusCode}`;
  },

  customErrorMessage: (req, res, err) => {
    if (process.env.NODE_ENV === 'development') {
      return `${req.method}   ${req.url} ${res.statusCode} ${err.message} \n ${err.stack}`;
    } else {
      return `${req.method}   ${req.url} ${res.statusCode} ${err.message}`;
    }
  }
});

export default logger;
