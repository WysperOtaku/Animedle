import { Request, Response, NextFunction } from "express";

export const parseDaily = (req: Request, res: Response, next: NextFunction) => {
    res.status(500).json({
        status: "failed",
        message: "Not implemented daily"
    });
}

export const parseHistory = (req: Request, res: Response, next: NextFunction) => {
    const limit = req.query.limit;
    res.status(200).json({
        status: "success",
        message: limit
    });
}

export const parseDate = (req: Request, res: Response, next: NextFunction) => {
    res.status(500).json({
        status: "failed",
        message: "Not implemented date"
    });
}