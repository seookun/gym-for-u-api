import { createLogger, format, transports } from 'winston';

export const logger = createLogger({
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.colorize(),
    format.printf((info) => `${info.timestamp} ${info.level} ${info.message} \n${info.stack || ''}`.trim()),
  ),
  transports: [
    new transports.Console({
      level: 'http',
    }),
  ],
});

export const stream = {
  write(message: string) {
    logger.http(message.trim());
  },
};
