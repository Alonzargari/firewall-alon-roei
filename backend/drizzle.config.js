import { defineConfig } from "drizzle-kit";
import config from "./src/config/env.js"; // עם .js
/*
const dbUri=`postgresql://${process.env.DB_USER}:
${process.env.DB_PASSWORD}@${process.env.DB_HOST}:
${process.env.DB_PORT}/${process.env.DB_NAME}_${process.env.NODE_ENV}`
*/
export default defineConfig({
    out: "./drizzle",
    schema: "./src/types/models",
    dialect: "postgresql",
    dbCredentials: {
        url: config.db.uri,
    },
    verbose: true,
    strict: true,
});
//# sourceMappingURL=drizzle.config.js.map