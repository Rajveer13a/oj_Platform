import express, { json, type Request, type Response } from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(json());

import authRouter from "./routes/auth.routes.js"

app.use('/api/v1/auth',authRouter);

app.get("/health", (req: Request, res: Response)=>{
    res.json({status: "ok"})
});


export default app;