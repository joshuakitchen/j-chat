import winston from 'winston';
export type Config = {
    admin_key: string;
    logger: winston.LoggerOptions;
};
export declare const config: Config;
export default config;
