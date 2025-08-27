import * as ipRepository from '../repositories/ipRepository';

import type {Request, Response} from 'express';
import postgres from "postgres";

export const addIpService = async (req: Request, res: Response) => {
    try {
        const { values, mode } = req.body
        const addedValues: string[] = [];
        for (const value of values) {
            const result= await ipRepository.addNewIP(value, mode);
            if (result.length > 0) {
                addedValues.push(String(result[0].value));
            }
        }
        res.status(200).json({ type:'ip', mode: mode, values: addedValues ,status:"success" });
    } catch (err:any) {
        res.status(500).json({ error: 'Server error' });
    }
};

export const deleteIpService = async (req: Request, res: Response) => {
    try {
        const { values, mode } = req.body;
        const deletedValues: string[] = [];
        for (const value of values) {
            const result= await ipRepository.deleteIP(value);
            if(result.length===0){
                return res.status(404).json({ error: 'ip not found' });
            }
            deletedValues.push(String(result[0].value));
        }
        res.status(200).json({ type:'ip', mode: mode, values: deletedValues ,status:"success" });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
}