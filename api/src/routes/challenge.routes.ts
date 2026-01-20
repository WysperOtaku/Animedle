import { Router } from 'express';
import { parseDaily, parseHistory, parseDate } from "../controllers/challenge.controller";

const router = Router();

router.get("/daily", parseDaily);

router.get("/history", parseHistory);

router.get("/challenge/:date", parseDate);

export default router;
