import winston from 'winston';
import config from './env';

const { combine, timestamp, printf } = winston.format;

export class LoggerSingleton {
    private static instance: LoggerSingleton;
    public readonly logger: winston.Logger;

    private constructor() {
        const logFormat = combine(
            timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
            printf(({ timestamp, level, message, ...meta }) => {
                const metaString = Object.keys(meta).length ? JSON.stringify(meta) : '';
                return `${timestamp} [${level.toUpperCase()}]: ${message} ${metaString}`;
            })
        );

        this.logger = winston.createLogger({
            level: config.logLevel,
            format: logFormat,
            transports: [new winston.transports.Console()],
        });

        this.overrideConsole();
    }

    private overrideConsole() {
        const logger = this.logger;
        const _log = console.log;

        console.log = function (...args: unknown[]) {
            logger.info(args.join(' '));
            _log.apply(console, args);
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