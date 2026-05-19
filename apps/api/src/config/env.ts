import dotenv from "dotenv";
import z from "zod";


dotenv.config();

const envSchema = z.object({
    NODE_ENV : z.enum(["development", "production", "test"]).default("development"),
    PORT: z.string().default("4000"),
    DATABASE_URL: z.string().min(1, "databse url is required"),
    JWT_SECRET: z.string().min(1,"jwt secret is required")
})

const parsed = envSchema.safeParse(process.env);

if(!parsed.success){
    console.log("Invalid enviornment variables");
    console.log(parsed.error.flatten().fieldErrors);
    process.exit(1);
}

export const env = parsed.data; 