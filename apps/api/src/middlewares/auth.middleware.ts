import type { NextFunction, Request, Response } from "express";
import { sendError } from "../utils/response.utils.js";
import { verifyToken, type JwtPayload } from "../utils/jwt.utils.js";


declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload
    }
  }
}

export const authenticate = (req: Request, res: Response, next: NextFunction) => {

    try {
        const { accessToken } = req.cookies;
        
        const payload = verifyToken(accessToken);

        req.user = payload;

        next();

    } catch (error) {
        sendError(res,"invalid or expired token", 401)
    }
}