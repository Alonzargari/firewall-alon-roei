import {DatabaseSingletonConnection} from '../db';
import { urlTable } from "../types/models/url";
import { eq } from "drizzle-orm";
import {UrlRecord} from "../types/interfaces/requestReturnType";


const dbInstance = DatabaseSingletonConnection.getInstance();
export const db = dbInstance.db;

export const updateActiveStatus = async (id: string, active: boolean): Promise<UrlRecord[] | null> => {
    return db
        .update(urlTable)
        .set({ active })
        .where(eq(urlTable.id, id))
        .returning();
};


export const getAllUrls = async (): Promise<UrlRecord[]> => {
    return db
        .select()
        .from(urlTable)
};

export const addNewUrl = async (value: string, mode: string): Promise<UrlRecord[]> => {
    return db
        .insert(urlTable)
        .values([{ value, mode }])
        .onConflictDoNothing()
        .returning();
};

export const deleteUrl = async (value: string): Promise<UrlRecord[]> => {
    return db
        .delete(urlTable)
        .where(eq(urlTable.value, value))
        .returning();
};
