import express, { json, type Request, type Response } from "express";
import cors from "cors";
import { errorHandler } from "./middlewares/errorHandler.middleware.js";
import cookieParser from "cookie-parser";

const app = express();

app.use(cors());
app.use(json());
app.use(cookieParser())

import authRouter from "./routes/auth.routes.js"

app.use('/api/v1/auth',authRouter);

app.get("/health", (req: Request, res: Response)=>{
    res.json({status: "ok"})
});

app.use(errorHandler);


export default app;