import { Request, Response, NextFunction } from 'express';

/**
 * Error handler centralizado
 * Debe ir DESPUÉS de todas las rutas en app.ts
 */
const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  // IMPORTANTE: Adjuntar el error a res para que pino-http pueda accederlo
  (res as any).err = err;

  // En desarrollo mostramos el mensaje real del error
  // En producción mostramos un mensaje genérico
  const message =
    process.env.NODE_ENV === 'development'
      ? err.message
      : 'Internal server error';

  res.status(500).json({
    status: 'error',
    message
  });
};

export default errorHandler;
