import { Environment } from './environment-interface';
import { Keys, dbUrl } from '../keys';

export const environment: Environment = {
    production: true,
    apiKey: Keys.apiKey,
    dbUrl,
};
