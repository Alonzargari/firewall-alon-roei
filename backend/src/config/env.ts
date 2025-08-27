import { z } from "zod";
import dotenv from "dotenv";

dotenv.config();

//Define schema for environment variables and validate them
const envSchema = z.object({
    NODE_ENV: z.enum(["dev", "production"]),
    DB_CONNECTION_INTERVAL: z.coerce.number(),
    PORT: z
        .coerce.number()
        .min(0)
        .max(65535),
    DB_NAME: z.string(),
    DB_PORT: z.coerce.number().min(0).max(65535),
    DB_HOST: z.string(),
    DB_USER: z.string(),
    DB_PASSWORD: z.string(),
    LOG_LEVEL: z.string(),
    LOG_FILE_NAME: z.string(),
    CONNECT_TO_DB_MAX_RETRIES: z.coerce.number(),
    MAX_FAKE_RECORD:z.coerce.number(),
});

// Run validation on process.env using the schema above
const parsed = envSchema.safeParse(process.env);

// If validation failed, print the errors and stop the program
if (!parsed.success) {
    console.error("Invalid environment variables:", parsed.error.issues);
    process.exit(1);
}
// Use the validated environment variables
const env = parsed.data;

const dbUri = `postgresql://${env.DB_USER}:${env.DB_PASSWORD}@${env.DB_HOST}:${env.DB_PORT}/${env.DB_NAME}_${env.NODE_ENV}`;


// Export a config object with environment, port, and database info
const config = {
    env: env.NODE_ENV,
    interval: env.DB_CONNECTION_INTERVAL,
    port: env.PORT,
    log: env.LOG_LEVEL,
    filename: env.LOG_FILE_NAME,
    db: {
        uri:dbUri,
    },
    maxRetries:env.CONNECT_TO_DB_MAX_RETRIES,
    maxFakeRecords: env.MAX_FAKE_RECORD
};
export default config
