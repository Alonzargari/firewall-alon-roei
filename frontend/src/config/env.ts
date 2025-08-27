import { z } from "zod";
import dotenv from "dotenv";
dotenv.config();
//Define schema for environment variables and validate them
const envSchema = z.object({
    NEXT_PUBLIC_ENV: z.enum(["dev", "production"]),
    NEXT_PUBLIC_API_URL: z.string().url(),
    NEXT_PUBLIC_LOG_LEVEL: z.string()
});
// Run validation on process.env using the schema above
const parsed = envSchema.safeParse(process.env);
// If validation failed, print the errors and stop the program
if (!parsed.success) { console.error("Invalid environment variables:", parsed.error.issues);
    process.exit(1);
}
// Use the validated environment variables
const env = parsed.data;
// Export a config object with environment, port, and database info
const config = {
    env: env.NEXT_PUBLIC_ENV,
    apiUrl:env.NEXT_PUBLIC_API_URL,
    logLevel: env.NEXT_PUBLIC_LOG_LEVEL,
};
export default config