import { Request, Response } from "express";

const fileNotFound = (req: Request, res: Response) => {
    return res.status(404).json({
        status: "failed",
        message: "El archivo solicitado no existe"
    });
}

export default fileNotFound;