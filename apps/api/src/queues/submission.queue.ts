import { QUEUE_NAMES, type jobPayloadInput } from "@oj/types";
import { Queue } from "bullmq";
import { redis } from "../config/redis.js";



export const submissionQueue = new Queue<jobPayloadInput>(QUEUE_NAMES.SUBMISSION, {
    connection: redis,
    defaultJobOptions: {
        attempts: 3,
        removeOnComplete: 10,
        removeOnFail: 10,
        backoff: {
            type: "exponential",
            delay: 1000
        }
    }
});