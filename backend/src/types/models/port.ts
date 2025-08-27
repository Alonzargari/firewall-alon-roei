import {boolean, integer, pgTable, text, uuid} from "drizzle-orm/pg-core";

export const portTable=pgTable("port",{
    id:uuid("id").primaryKey().defaultRandom(),
    value:integer("value").notNull().unique(),
    active: boolean("active").notNull().default(false),
    mode: text("mods").notNull()
})