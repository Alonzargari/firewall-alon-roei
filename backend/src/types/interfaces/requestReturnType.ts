
export interface IpRecord {
    id: string;
    mode: string;
    value: string;
    active?:boolean;
}

export interface UrlRecord {
    id: string;
    mode: string;
    value: string;
    active?:boolean
}

export interface PortRecord {
    id: string;
    mode: string;
    value: number;
    active?:boolean;
}
