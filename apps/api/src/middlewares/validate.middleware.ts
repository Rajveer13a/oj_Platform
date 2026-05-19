import type { NextFunction, Request, Response,  } from "express"
import type { ZodSchema } from "zod";
import { sendError } from "../utils/response.utils.js";


export const validate = (schema: ZodSchema) => {

    return (req: Request, res: Response, next: NextFunction)=>{

        const result = schema.safeParse(req.body);

        if(!result.success){
            const error = result.error.flatten().fieldErrors;
            sendError(res, error as unknown as string,400 );
            return;
        }

        req.body = result.data;
        next();

    };

};