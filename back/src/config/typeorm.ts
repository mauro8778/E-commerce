import {config as dotenvConfig} from 'dotenv';
import{registerAs} from '@nestjs/config';
import { DataSource,DataSourceOptions }from 'typeorm';

import { existsSync } from 'fs';

const envPath = existsSync('.env') ? '.env' : existsSync('development.env') ? 'development.env' : undefined;
dotenvConfig(envPath ? { path: envPath } : undefined);

const config ={

    type: 'postgres',
    host: process.env.DB_HOST,
    //host: 'postgresdb2',
    port: process.env.DB_PORT as unknown as number,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: ['dist/**/*.entity{.ts,.js}'],
    autoLoadEntities: true,
    logging: true,
    synchronize: process.env.NODE_ENV !== 'production',
    dropSchema: false,
    migrations: ['dist/migrations/*{.ts,.js}'],
}
export default registerAs('typeorm', () => config)
export const connectionSource = new DataSource(config as DataSourceOptions)