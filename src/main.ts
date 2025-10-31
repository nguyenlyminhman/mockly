import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressAdapter, NestExpressApplication } from '@nestjs/platform-express';
import { SharedModule } from './modules/shared/shared.module';
import { ServerConfigService } from './modules/shared/server-config.service';
import { join } from 'path';
import helmet from 'helmet';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerConfig } from './config/swagger';
import * as morgan from 'morgan';
import { LoggingInterceptor } from './interceptor/logging.interceptor';
import { AuthInterceptor } from './interceptor/auth.interceptor';


async function bootstrap(): Promise<NestExpressApplication> {
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
    new ExpressAdapter(),
    { cors: true }
  );
  const serverConfig = app.select(SharedModule).get(ServerConfigService);
  const { port } = serverConfig.serverPort;

  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.use(helmet());

  app.useGlobalInterceptors(
    new LoggingInterceptor(),
    new AuthInterceptor()
  );

  app.setGlobalPrefix('/api');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );
  app.use(morgan('combined'));
  app.enableVersioning();
  // Microservice config here


  // Setup swagger
  if (serverConfig.swaggerEnabled) {
    SwaggerConfig(app);
  }
  // Set global prefix for endpoint


  await app.listen(port);

  return app;
}

bootstrap();
