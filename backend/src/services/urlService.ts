import * as urlRepository from '../repositories/urlRepository';

import type {Request, Response} from 'express';


export const addUrlService = async (req: Request, res: Response) => {
    try {
        const addedValues:string[]=[]
        const { values, mode } = req.body;
        for (const value of values) {
            const result= await urlRepository.addNewUrl(value, mode);
            if (result.length > 0) {
                addedValues.push(String(result[0].value));
            }
        }
        res.status(200).json({ type:'url', mode: mode, values: addedValues ,status:"success" })
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
};

export const deleteUrlService = async (req: Request, res: Response) => {
    try {
        const deletedValues:string[]=[]
        const { values, mode } = req.body;
        for (const value of values) {
            const result= await urlRepository.deleteUrl(value);
            if(result.length===0){
                return res.status(404).json({ error: 'url not found' });
            }
            deletedValues.push(String(result[0].value));
        }
        res.status(200).json({ type:'url', mode: mode, values: deletedValues ,status:"success" });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
}