import dotenv from "dotenv";
import z from "zod";


dotenv.config();

const envSchema = z.object({
    NODE_ENV : z.enum(["development", "production", "test"]).default("development"),
    PORT: z.string().default("4000"),
    DATABASE_URL: z.string().min(1, "databse url is required"),
    JWT_SECRET: z.string().min(1,"jwt secret is required"),
    REDIS_HOST: z.string().default("localhost"),
    REDIS_PORT: z.string().transform( val => parseInt(val || "6379")),
    REDIS_PASSWORD: z.string().optional(),
    RESEND_API_KEY: z.string().min(1,"resend api key is required"),
    EMAIL_VERIFICATION_JWT_SECRET: z.string().min(1,"email verification jwt secret is required"),
    FRONTEND_URL: z.string().min(1,"frontend url is required")
})

const parsed = envSchema.safeParse(process.env);

if(!parsed.success){
    console.log("Invalid enviornment variables");
    console.log(parsed.error.flatten().fieldErrors);
    process.exit(1);
}

export const env = parsed.data; 