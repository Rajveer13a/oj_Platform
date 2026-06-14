import type { NextFunction, Request, Response } from "express";
import { sendError } from "../utils/response.utils.js";
import { verifyToken } from "../utils/jwt.utils.js";


export const authenticate = (isOnlyVerifiedAllowed: boolean = true) => (req: Request, res: Response, next: NextFunction) => {

    try {
        const { accessToken } = req.cookies;
        
        const payload = verifyToken(accessToken);

        if(isOnlyVerifiedAllowed && !payload.isVerified ){
            return sendError(res, "unverified user account", 400);
        }

        req.user = payload;

        next();

    } catch (error) {
        sendError(res,"invalid or expired token", 401)
    }
}