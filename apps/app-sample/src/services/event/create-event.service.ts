import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EventDocument } from '../../domains/models/event.schema';

export class CreateEventCommand {}
export class CerateEventResult {
  readonly ok: boolean;

  constructor(result: CerateEventResult) {
    Object.assign(this, result);
  }
}

@Injectable()
export class CreateEventService {
  constructor(
    @InjectModel(Event.name) private readonly eventModel: Model<EventDocument>
  ) {}

  async execute(command: CreateEventCommand): Promise<CerateEventResult> {
    const result = new CerateEventResult({
      ok: true,
    });
    return result;
  }
}
