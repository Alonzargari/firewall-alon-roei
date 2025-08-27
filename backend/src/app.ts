import express from "express";
const app = express();

import ipRouter from './routes/ipRouter';
import urlRouter from './routes/urlRouter';
import portRouter from './routes/portRouter';
import rulesRouter from './routes/rulesRouter';
import config from "./config/env";
import "./config/Logger"
import {DatabaseSingletonConnection} from './db';

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use('/api/firewall',ipRouter,urlRouter,portRouter,rulesRouter)
export default app

const dbInstance = DatabaseSingletonConnection.getInstance();
export const connectWithRetry = (interval: number) => dbInstance.connectWithRetry(interval);

const PORT = config.port;
const INTERVAL =config.interval

connectWithRetry(INTERVAL).then(() => {
    app.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`);
    });
});
