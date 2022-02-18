import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LoggerMiddleware } from '../middlewares/logger';
import { EventModule } from './events.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/eventin-playground'),
    EventModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('users');
  }
}
