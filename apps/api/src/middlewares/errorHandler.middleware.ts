import type { Errback, NextFunction, Request, Response } from "express"
import { sendError } from "../utils/response.utils.js"
import { log } from "node:console";

export const errorHandler = (err: Errback,req: Request, res: Response, next: NextFunction) => {
    log(err);
    sendError(res,"something went wrong", 500);
}