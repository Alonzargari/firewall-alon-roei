import * as portRepository from '../repositories/portRepository';
import type {Request, Response} from 'express';
import * as ipRepository from "../repositories/ipRepository";


export const addPortService = async (req: Request, res: Response) => {
    try {
        const { values, mode } = req.body;
        const addedValues:number[]=[];
        for (const value of values) {
            const result= await portRepository.addNewPort(value, mode);
            if (result.length > 0) {
                addedValues.push(Number(result[0].value));
            }
        }
        res.status(200).json({ type:'port', mode: mode, values: addedValues ,status:"success" })
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
};

export const deletePortService = async (req: Request, res: Response) => {
    try {
        const { values, mode } = req.body;
        const deletedValues:number[] =[];
        for (const value of values) {
           const result= await portRepository.deletePort(value);
            if(result.length===0){
                return res.status(404).json({ error: 'port not found' });
            }
            deletedValues.push(Number(result[0].value));
        }

        res.status(200).json({ type:'port', mode: mode, values: deletedValues ,status:"success" });
    } catch (err) {
        res.status(500).json({ error: 'Server error'});
    }
}
