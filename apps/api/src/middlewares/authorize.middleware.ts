import type { NextFunction, Request, Response } from "express"
import { sendError } from "../utils/response.utils.js"

export const authorize = (...roles:string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {

        if(!req.user || !roles.includes(req.user.role)){
            return sendError(res,"unauthorized access",403);
        };

        next();

    };
}