import 'dotenv/config'
import * as Joi from 'joi';
interface EnvironmentConfig {
  DATABASE_HOST: string;
  DATABASE_PORT: number;
  DATABASE_USER: string;
  DATABASE_PASSWORD: string;
  DATABASE_NAME: string;
  NODE_ENV: 'dev' | 'production';
  PORT: number;
  FILE_SERVICE_URL: string;
  REVIEW_SERVICE_URL: string;
  BOOTCAMP_SERVICE_URL: string;
  ASSESSMENT_SERVICE_URL: string;
}

const environmentConfigSchema = Joi.object({
  DATABASE_HOST: Joi.string().required(),
  DATABASE_PORT: Joi.number().required(),
  DATABASE_USER: Joi.string().required(),
  DATABASE_PASSWORD: Joi.string().required(),
  DATABASE_NAME: Joi.string().required(),
  NODE_ENV: Joi.string().valid('dev', 'production').required(),
  PORT: Joi.number().required(),
  FILE_SERVICE_URL: Joi.string().uri().required(),
  REVIEW_SERVICE_URL: Joi.string().uri().required(),
  BOOTCAMP_SERVICE_URL: Joi.string().uri().required(),
  ASSESSMENT_SERVICE_URL: Joi.string().uri().required(),
}).unknown()


const { error, value } = environmentConfigSchema.validate(process.env);

if (error) {
  throw new Error(`Config Validation ${error.message}`);
}

const envVars: EnvironmentConfig = value;

export const envs = {
  PORTS: envVars.PORT,
  DATABASE_HOST: envVars.DATABASE_HOST,
  DATABASE_PORT: envVars.DATABASE_PORT,
  DATABASE_USER: envVars.DATABASE_USER,
  DATABASE_PASSWORD: envVars.DATABASE_PASSWORD,
  DATABASE_NAME: envVars.DATABASE_NAME,
  NODE_ENV: envVars.NODE_ENV,
  PORT: envVars.PORT,
  FILE_SERVICE_URL: envVars.FILE_SERVICE_URL,
  REVIEW_SERVICE_URL: envVars.REVIEW_SERVICE_URL,
  BOOTCAMP_SERVICE_URL: envVars.BOOTCAMP_SERVICE_URL,
  ASSESSMENT_SERVICE_URL: envVars.ASSESSMENT_SERVICE_URL,
};

