import winston from 'winston';
import config from "./env";

const { combine, timestamp, printf } = winston.format;

export class LoggerSingleton {
    private static instance: LoggerSingleton;
    public readonly logger: winston.Logger;

    private constructor() {
        const transports = this.createTransports();
        const logFormat = this.createLogFormat();

        this.logger = winston.createLogger({
            level: config.log,
            format: logFormat,
            transports,
        });

        this.overrideConsole();
    }

    private createTransports(): winston.transport[] {
        const isDev = config.env === "dev";
        return isDev
            ? [new winston.transports.Console()]
            : [new winston.transports.File({ filename: config.filename })];
    }

    private createLogFormat() {
        return combine(
            timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
            printf(({ timestamp, level, message, ...meta }) => {
                const metaString = Object.keys(meta).length ? JSON.stringify(meta) : '';
                return `${timestamp} [${level.toUpperCase()}]: ${message} ${metaString}`;
            })
        );
    }

    private overrideConsole() {
        const logger = this.logger;

        const _log = console.log;
        const _error = console.error;
        const _warn = console.warn;
        const _debug = console.debug;

        console.log = function (...args: any[]) {
            logger.info(args.join(' '));
            _log.apply(console, args);
        };

        console.error = function (...args: any[]) {
            logger.error(args.join(' '));
            _error.apply(console, args);
        };

        console.warn = function (...args: any[]) {
            logger.warn(args.join(' '));
            _warn.apply(console, args);
        };

        console.debug = function (...args: any[]) {
            logger.debug(args.join(' '));
            _debug.apply(console, args);
        };
    }

    public static getInstance(): LoggerSingleton {
        if (!LoggerSingleton.instance) {
            LoggerSingleton.instance = new LoggerSingleton();
        }
        return LoggerSingleton.instance;
    }
}

export const logger = LoggerSingleton.getInstance().logger;
