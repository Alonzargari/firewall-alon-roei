import * as ipRepository from '../repositories/ipRepository';
import * as portRepository from '../repositories/portRepository';
import * as urlRepository from '../repositories/urlRepository';
import type {Request, Response} from 'express';


export const getAllRules = async (req: Request, res: Response) => {
    const type = req.query.type as string | undefined;

    const formatRules = <T extends { id: any; value: any; mode: string }>(arr: T[]) => ({
        blacklist: arr.filter(item => item.mode === "blacklist").map(item => ({ id: item.id, value: item.value })),
        whitelist: arr.filter(item => item.mode === "whitelist").map(item => ({ id: item.id, value: item.value })),
    });

    const response: any = {};

    if (!type || type === "ips") {
        const ipsArr = await ipRepository.getAllIps();
        response.ips = formatRules(ipsArr);
    }

    if (!type || type === "urls") {
        const urlsArr = await urlRepository.getAllUrls();
        response.urls = formatRules(urlsArr);
    }

    if (!type || type === "ports") {
        const portsArr = await portRepository.getAllPorts();
        response.ports = formatRules(portsArr);
    }

    return res.status(200).json({ response });
};


export const toggleActive = async (req: Request, res: Response) => {
    const {urls,ports, ips } = req.body;

    const updated = {
        urls: [] as any[],
        ports: [] as any[],
        ips: [] as any[],
    };
    try {
        if (urls?.ids?.length) {
            for (const id of urls.ids) {
                const updatedUrl = await urlRepository.updateActiveStatus(id, urls.active);
                if (updatedUrl === null) {
                    return res.status(404).json({ error: "url id not exist" });
                } else {
                    updated.urls.push(updatedUrl);
                }
            }
        }

        if (ports?.ids?.length) {
            for (const id of ports.ids) {
                const updatedPort = await portRepository.updateActiveStatus(id, ports.active);
                if (updatedPort === null) {
                    return res.status(404).json({ error: "port id not exist" });
                } else {
                    updated.ports.push(updatedPort);
                }
            }
        }

        if (ips?.ids?.length) {
            for (const id of ips.ids) {
                const updatedIp = await ipRepository.updateActiveStatus(id, ips.active);
                if (updatedIp === null) {
                    return res.status(404).json({ error: "ip id not exist" });
                } else {
                    updated.ips.push(updatedIp);
                }
            }
        }

        return res.status(200).json({ updated:[updated] });
    }catch (err:any){
        return res.status(400).json({ error:err.message });
    }

};
