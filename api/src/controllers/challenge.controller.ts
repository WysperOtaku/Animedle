import { Request, Response, NextFunction } from "express";
import { getRetoDay, getRetoHistory, getRetosDaily } from "../services/challenge.service";

export const parseDaily = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await getRetosDaily();

        const response = {
            status: "success",
            data: {
                challenges: result
            }
        }

        res.status(200).json({ response });
    }
    catch (error) {
        return res.status(500).json({
            status: "error",
            message: (error as Error).message
        });
    }
    
    next();
}

export const parseHistory = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const limit = parseInt(req.query.limit as string);
        if (isNaN(limit)) {
            return res.status(400).json({
                status: "failed",
                message: "The limit value is not a number."
            });
        }

        const result = await getRetoHistory(limit);

        const response = {
            status: "success",
            data: {
                challenges: result
            }
        }

        res.status(200).json({ response });
    }
    catch (error) {
        return res.status(500).json({
            status: "error",
            message: (error as Error).message
        });
    }

    next();
}

export const parseDate = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const date = req.params.date;
        if (!date.match(/^\d{4}-\d{2}-\d{2}$/)) {
            return res.status(400).json({
                status: "failed",
                message: "The date parameter value is not with the correct format YYYY-MM-DD."
            });
        }

        const result = await getRetoDay(date);

        const response = {
            status: "success",
            data: {
                challenges: result
            }
        }

        res.status(200).json({ response });
    }
    catch (error) {
        return res.status(500).json({
            status: "error",
            message: (error as Error).message
        });
    }

    next();
}