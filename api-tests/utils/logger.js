import { createLogger, format, transports } from 'winston';

const consoleFormat = format.combine(
    format.colorize({
        all: true
    }),
    format.timestamp({
        format: 'YY-MM-DD HH:mm:ss'
    }),
    format.printf(({ level, message, timestamp }) => {
        return `[LOGGER] ${timestamp} ${level}: \n${message}`;
    })
);

const logger = createLogger({
    levels: {
        error: 0,
        warn: 1,
        info: 2,
        debug: 3,
    },
    level: 'debug',
    format: consoleFormat,
    transports: [
        new transports.Console()
    ],
});

export default logger;