import type { NextFunction, Request, Response } from "express";

type asyncReqHandler = (req: Request, res: Response) => Promise<any> | any;

export const tryCatch = (fn: asyncReqHandler) => {

    return async(req: Request, res: Response, next: NextFunction) => {
         try {
            await fn(req, res);
         } catch (error) {
            next(error);
         }
    }

}