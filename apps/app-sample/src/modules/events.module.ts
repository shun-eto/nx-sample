import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CreateEventController } from '../controllers/event/create-event.controller';
import { EventSchema } from '../domains/models/event.schema';
import { CreateEventService } from '../services/event/create-event.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Event.name, schema: EventSchema }]),
  ],
  controllers: [CreateEventController],
  providers: [CreateEventService],
})
export class EventModule {}
