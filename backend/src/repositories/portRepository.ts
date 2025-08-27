import {DatabaseSingletonConnection} from '../db';
import { portTable } from "../types/models/port";
import {eq} from 'drizzle-orm';
import {PortRecord} from "../types/interfaces/requestReturnType";
import {urlTable} from "../types/models/url";

const dbInstance = DatabaseSingletonConnection.getInstance();
export const db = dbInstance.db;

export const updateActiveStatus = async (id: string, active: boolean): Promise<PortRecord[] | null> => {
    return db
        .update(portTable)
        .set({ active })
        .where(eq(portTable.id, id))
        .returning();
};

export const getAllPorts = async (): Promise<PortRecord[]> => {
    return db
        .select()
        .from(portTable)
};

export const addNewPort = async (value: number, mode: string): Promise<PortRecord[]> => {
    return db
        .insert(portTable)
        .values([{ value, mode }])
        .onConflictDoNothing()
        .returning();
};



export const deletePort = async (value: number): Promise<PortRecord[]> => {
    return db
        .delete(portTable)
        .where(eq(portTable.value, value))
        .returning();
};
