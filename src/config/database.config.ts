import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const toBoolean = (value: string | undefined, fallback: boolean): boolean => {
  if (value === undefined) {
    return fallback;
  }
  return value.toLowerCase() === 'true';
};

export default registerAs('database', (): TypeOrmModuleOptions => {
  const nodeEnv = process.env.NODE_ENV ?? 'local';
  const isLocal = nodeEnv === 'local';

  return {
    type: 'postgres',
    host: process.env.DB_HOST ?? 'localhost',
    port: Number(process.env.DB_PORT ?? '5432'),
    username: process.env.DB_USERNAME ?? 'postgres',
    password: process.env.DB_PASSWORD ?? '',
    database: process.env.DB_NAME ?? 'db_paideia_template_nest_rest',
    autoLoadEntities: true,
    synchronize: toBoolean(process.env.DB_SYNCHRONIZE, false),
    logging: toBoolean(process.env.DB_LOGGING, isLocal),
  };
},
);
