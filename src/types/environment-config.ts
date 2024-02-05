import * as Joi from 'joi';

const environmentConfigSchema = Joi.object({
  DATABASE_HOST: Joi.string().required(),
  DATABASE_PORT: Joi.number().required(),
  DATABASE_USER: Joi.string().required(),
  DATABASE_PASSWORD: Joi.string().required(),
  DATABASE_NAME: Joi.string().required(),
  NODE_ENV: Joi.string().valid('dev', 'prod').required(),
  FILE_SERVICE_URL: Joi.string().uri().required(),
  REVIEW_SERVICE_URL: Joi.string().uri().required(),
  BOOTCAMP_SERVICE_URL: Joi.string().uri().required(),
  ASSESSEMENT_SERVICE_URL: Joi.string().uri().required(),
});

interface EnvironmentConfig {
  DATABASE_HOST: string;
  DATABASE_PORT: number;
  DATABASE_USER: string;
  DATABASE_PASSWORD: string;
  DATABASE_NAME: string;
  NODE_ENV: 'dev' | 'prod';
  FILE_SERVICE_URL: string;
  REVIEW_SERVICE_URL: string;
  BOOTCAMP_SERVICE_URL: string;
  ASSESSEMENT_SERVICE_URL: string;
}

export { environmentConfigSchema };
export type { EnvironmentConfig };
