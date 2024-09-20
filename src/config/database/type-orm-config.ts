import { envs } from 'src/types/environment-config';
import { DataSourceOptions } from 'typeorm';

const config: DataSourceOptions = {
  type: 'postgres',
  host: envs.DATABASE_HOST,
  port: envs.DATABASE_PORT,
  username: envs.DATABASE_USER,
  password: envs.DATABASE_PASSWORD,
  database: envs.DATABASE_NAME,
  // Only include necessary properties
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['dist/migrations/*{.ts,.js}'], // Array of strings for migration file paths
  synchronize: envs.NODE_ENV === 'dev',
};

export default config;
