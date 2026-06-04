import z from "zod";
import dotenv from "dotenv"



dotenv.config();

const envSchema = z.object({
    NODE_ENV: z.enum(["development", "production", "test"]),
    DATABASE_URL: z.string().min(1) ,
    REDIS_HOST: z.string().default("localhost"),
    REDIS_PORT: z.string().transform( val => parseInt( val || "6379" ) ),
    REDIS_PASSWORD: z.string().optional()
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.log("Invalid enviornment variables");
  console.log(parsed.error.flatten().fieldErrors);
  process.exit(1);
}

export const env = parsed.data;