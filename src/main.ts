import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as packageJson from '../package.json';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('Main');
  const configService = app.get(ConfigService);

  const appName = packageJson.name;
  const appVersion = packageJson.version;
  const port = configService.get<number>('PORT') ?? 3000;
  const environment = configService.get<string>('NODE_ENV') ?? 'development';

  app.setGlobalPrefix(appName);
  await app.listen(port);

  logger.log(`Application started: ${appName} v${appVersion}`);
  logger.log(`Server listening on http://localhost:${port}`);
  logger.debug(`Environment: ${environment}`);
}
bootstrap();
