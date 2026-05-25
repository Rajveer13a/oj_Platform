import type { NextFunction, Request, Response,  } from "express"
import type { ZodSchema } from "zod";
import { sendError } from "../utils/response.utils.js";


export const validate = (schema: ZodSchema, type: "body" | "query" | "params" = "body") => {

    return (req: Request, res: Response, next: NextFunction)=>{

        const result = schema.safeParse(req[type]);

        if(!result.success){
            const error =  result.error.flatten().formErrors[0] || result.error.flatten().fieldErrors;
            sendError(res, error as unknown as string,400 );
            return;
        }
        
        switch (type) {
          case "body":
            req.body = result.data;
            break;

          case "query":
            req.parsedQuery = result.data as Record<string, unknown>;
            break;

          case "params":
            req.parsedParams = result.data as Record<string, unknown>;
            break;

          default:
            break;
        }

        next();

    };

};