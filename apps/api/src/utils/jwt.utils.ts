import jwt from "jsonwebtoken";
import { env } from "../config/env.js";

export interface JwtPayload{
    userId:  string,
    role: string,
    isVerified: boolean
}

export const signToken = ( payload: JwtPayload ) : string => {
    return jwt.sign(payload, env.JWT_SECRET, { expiresIn: "7d"});
}

export const verifyToken = (token: string): JwtPayload => {
    return jwt.verify(token, env.JWT_SECRET) as JwtPayload;
}