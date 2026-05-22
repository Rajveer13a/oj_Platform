import type { Response } from "express";


export const sendResponse = (res:Response, message: string ,data: unknown , stausCode= 200) => {
    res.status(stausCode).json({
        success:true,
        message,
        data
    });
}

export const sendError = (res:Response, message: string, statusCode=400) => {
    res.status(statusCode).json({
        success: false,
        message
    });
}