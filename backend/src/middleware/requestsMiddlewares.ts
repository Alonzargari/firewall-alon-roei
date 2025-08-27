import type { Request, Response, NextFunction } from 'express';
import validator from 'validator';

export const validateRequest=(req: Request, res: Response, next: NextFunction)=> {

    const { values ,mode} = req.body;

    if(!mode) return res.status(400).json({ error: "'mode' must be mention" })

    if (typeof mode !== 'string' || (mode !== 'blacklist' && mode !== 'whitelist')) {
        return res.status(400).json({ error: "'mode' must be either 'blacklist' or 'whitelist'" });
    }

    if (!Array.isArray(values)||values.length===0) {
        return res.status(400).json({ error: "'values' must be an array" });
    }
    next();
}

export const ipValidator = (req: Request, res: Response, next: NextFunction)=> {
    const values = req.body.values;
    if (!values.every((value: any) => typeof value === 'string')) {
        return res.status(400).json({ error: 'All values must be strings' });
    }
    if (!values.every((ip:string) => validator.isIP(ip, 4))) {
        return res.status(400).json({ error: 'Invalid IPv4 address' });
    }
    next();
}

export const urlValidator = (req: Request, res: Response, next: NextFunction)=> {
    const values = req.body.values;
    if (!values.every((value: any) => typeof value === 'string')) {
        return res.status(400).json({ error: 'All values must be strings' });
    }
    if (!values.every((url:string) => validator.isURL(url))) {
        return res.status(400).json({ error: 'URL format is not valid' });
    }
    next();
}

export const portValidator = (req: Request, res: Response, next: NextFunction)=> {
    const values = req.body.values;
    if (!values.every((value: any) => typeof value === 'number')) {
        return res.status(400).json({ error: 'All values must be numbers' });
    }
    if (!values.every((value:number) => Number.isInteger(value))) {
        return res.status(400).json({ error: 'Port values must be integers' });
    }
    if (!values.every((value: number) => value >= 0 && value <= 65535)) {
        return res.status(400).json({ error: 'Port values must be between 0 and 65535' });
    }
    next();
}