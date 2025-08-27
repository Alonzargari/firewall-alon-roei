import {faker} from "@faker-js/faker";
import { DatabaseSingletonConnection } from '../db';
import { ipTable } from '../types/models/ip';
import { portTable } from '../types/models/port';
import { urlTable } from '../types/models/url';
import "../config/Logger"
import config  from "../config/env"

const dbInstance = DatabaseSingletonConnection.getInstance();
export const db = dbInstance.db;

async function generateMockData() {
    const ipData = Array.from({ length: config.maxFakeRecords }, () => ({
        value: faker.internet.ipv4(),
        active: faker.datatype.boolean(),
        mode: faker.helpers.arrayElement(['blacklist', 'whitelist']),
    }));
    const edgeIps = [
        { value: "127.0.0.1", active: true, mode: "whitelist" },
        { value: "0.0.0.0", active: false, mode: "blacklist" },
        { value: "255.255.255.255", active: true, mode: "blacklist" }
    ];
    const allIpData = [...ipData, ...edgeIps];
    await db.insert(ipTable).values(allIpData);

    const portData = Array.from({ length: 10 }, () => ({
        value: faker.internet.port(),
        active: faker.datatype.boolean(),
        mode: faker.helpers.arrayElement(['blacklist', 'whitelist']),
    }));
    const edgePorts = [
        { value: 0, active: true, mode: "whitelist" },
        { value: 65535, active: false, mode: "blacklist" },
    ];
    const allPortData = [...portData, ...edgePorts];

    await db.insert(portTable).values(allPortData);

    const urlData = Array.from({ length: 10 }, () => ({
        value: faker.internet.url(),
        active: faker.datatype.boolean(),
        mode: faker.helpers.arrayElement(['blacklist', 'whitelist']),
    }));

    const edgeUrls = [
        { value: "http://localhost:3000", active: true, mode: "whitelist" },
        { value: "https://example.com/" + "a".repeat(1000), active: false, mode: "blacklist" },
        { value: "http://example.com/page?x=1&y=2#top", active: true, mode: "whitelist" }
    ];
    const allUrlData = [...urlData, ...edgeUrls];

    await db.insert(urlTable).values(allUrlData);
    console.log('Mock data population completed successfully!');
}

generateMockData()
    .catch(err=>console.error('Error populating mock data:', err.message))



