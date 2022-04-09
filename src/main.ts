import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as bodyParser from 'body-parser';
import { AppConfigService } from './config/app/configuration.service';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Get app config for cors settings and starting the app.
  const appConfig: AppConfigService = app.get(AppConfigService);

  app.useGlobalPipes(
    new ValidationPipe({
      disableErrorMessages: appConfig.env !== 'development',
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Engineering Manager tools')
    .setDescription(
      'Day to day tool to assist on Engineering manager <b>tasks</b> ',
    )
    .setVersion(process.env.npm_package_version)
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      'JWT',
    )
    .addSecurity('ApiKey', {
      type: 'apiKey',
      name: 'x-api-key',
      in: 'header',
    })
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Body parser overwrite default limit set by nest
  app.use(bodyParser.json({ limit: appConfig.jsonLimit }));

  await app.listen(appConfig.port);
}
bootstrap();
