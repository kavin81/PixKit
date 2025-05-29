import dotenv from "dotenv";
import { z } from "zod";


dotenv.config();


const envSchema = z.object({
    PORT: z.coerce.number().default(3000),
    S3_ENDPOINT: z.string(),
    S3_ACCESS_KEY_ID: z.string(),
    S3_SECRET_ACCESS_KEY: z.string(),
    S3_BUCKET: z.string(),
    REDIS_HOST: z.string().optional(),
    REDIS_PASSWORD: z.string().optional(),
    REDIS_PORT: z.coerce.number().default(6379),
})

const env = envSchema.safeParse(process.env);

if (!env.success) {
    console.error("Invalid environment variables:", env.error.format());
    process.exit(1);
}

const { data } = env;

export const config = {
    port: data.PORT,
    s3: {
        endpoint: data.S3_ENDPOINT,
        accessKeyId: data.S3_ACCESS_KEY_ID,
        secretAccessKey: data.S3_SECRET_ACCESS_KEY,
        bucket: data.S3_BUCKET,
    },
    redis: {
        host: data.REDIS_HOST,
        password: data.REDIS_PASSWORD,
        port: data.REDIS_PORT,
    },
}