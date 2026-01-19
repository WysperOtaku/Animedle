import { Request, Response, NextFunction } from 'express';
import { pool } from './dbconnection';

export async function testdb(
  _req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const result = await pool.query('SELECT NOW() as now');
    res.status(200).json({
      status: 'success',
      now: result.rows[0].now
    });
  } catch (err) {
    next(err);
  }
}
