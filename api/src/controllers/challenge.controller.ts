import { Request, Response, NextFunction } from "express";
import { getRetosDaily } from "../services/challenge.service";
import { stat } from "fs";
import { parse } from "path";

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

        const result = "";

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
    res.status(500).json({
        status: "failed",
        message: "Not implemented date"
    });

    next();
}