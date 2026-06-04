import { Redis } from "ioredis";
import { env } from "./env.js";

export const redis =  new Redis({
    host: env.REDIS_HOST,
    port: env.REDIS_PORT,
    maxRetriesPerRequest: null
});

redis.on("connect", ()=> console.log("redis connected"));
redis.on("error", (err)=> console.log("redis error", err));