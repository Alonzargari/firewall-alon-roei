import {DatabaseSingletonConnection} from '../db';
import {ipTable} from "../types/models/ip";
import {eq} from 'drizzle-orm';
import {IpRecord} from "../types/interfaces/requestReturnType";

const dbInstance = DatabaseSingletonConnection.getInstance();
export const db = dbInstance.db;

export const updateActiveStatus = async (id: string, active: boolean): Promise<IpRecord[] | null> => {
    return db
        .update(ipTable)
        .set({active})
        .where(eq(ipTable.id, id))
        .returning();
};

export const getAllIps = async (): Promise<IpRecord[]> => {
    return db
        .select()
        .from(ipTable);
};



export const addNewIP = async (value: string, mode: string): Promise<IpRecord[]> => {
    return db
        .insert(ipTable)
        .values([{value, mode}])
        .onConflictDoNothing()
        .returning();
};

export const deleteIP = async (value: string): Promise<IpRecord[]> => {
    return db
        .delete(ipTable)
        .where(eq(ipTable.value, value))
        .returning();
};
