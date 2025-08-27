import {boolean, pgTable, text, uuid} from "drizzle-orm/pg-core";

export const ipTable=pgTable("ip",{
    id:uuid("id").primaryKey().defaultRandom(),
    value:text("value").notNull().unique(),
    active: boolean("active").notNull().default(false),
    mode: text("mods").notNull()
})