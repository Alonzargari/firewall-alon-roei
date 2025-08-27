import { Pool } from "pg";
import config from "./config/env";
import { drizzle } from "drizzle-orm/node-postgres";
import { ipTable } from "./types/models/ip";

export class DatabaseSingletonConnection {
    private static instance: DatabaseSingletonConnection;
    public readonly pool: Pool;
    public readonly db: ReturnType<typeof drizzle>;

    private constructor() {
        this.pool = new Pool({ connectionString: config.db.uri });
        this.db = drizzle(this.pool);
    }

    static getInstance(): DatabaseSingletonConnection {
        if (!DatabaseSingletonConnection.instance) {
            DatabaseSingletonConnection.instance = new DatabaseSingletonConnection();
        }
        return DatabaseSingletonConnection.instance;
    }

    async connectWithRetry(interval: number) {
        let attempts = 0;
        while (attempts < config.maxRetries) {
            try {
                await this.db.select().from(ipTable).limit(1);
                console.log("Database connection successful!");
                break;
            } catch (error: unknown) {
                attempts++;
                if (error instanceof Error) {
                    console.error("Database connection failed! trying again", error.message);
                } else {
                    console.error("Unknown error", error);
                }
                await new Promise((res) => setTimeout(res, interval));
            }
        }
        if (attempts >= config.maxRetries) {
            console.error("Max retry attempts reached. Could not connect to the database.");
            process.exit(1);
        }
    }
}
