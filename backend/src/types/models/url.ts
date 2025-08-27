import {pgTable,uuid,text,boolean,integer} from "drizzle-orm/pg-core"

export const urlTable=pgTable("url",{
    id:uuid("id").primaryKey().defaultRandom(),
    value:text("value").notNull().unique(),
    active: boolean("active").notNull().default(false),
    mode: text("mods").notNull()
})