import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    })
  );

  /** OpenAPI
   * access to <protocol>://<FQDN>/api
   */
  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('NestJS Tutorial')
    .setDescription('The NestJS Tutorial API description')
    .setVersion('1.0')
    .addTag('cats', 'description')
    .addTag('users', 'description')
    .addTag('(root)')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
