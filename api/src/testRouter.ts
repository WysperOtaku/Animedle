import { Router } from 'express';
import { testdb } from './db.debug';

const router = Router();

router.get('/testdb', testdb);

export default router;
