import { Body, Controller, Post } from '@nestjs/common';
import {
  CreateEventCommand,
  CreateEventService,
} from '../../services/event/create-event.service';

export class CreateEventRequestBody {}
export class CreateEventResponseBody {
  readonly ok: boolean;
  constructor(resBody: CreateEventResponseBody) {
    Object.assign(this, resBody);
  }
}

@Controller('events')
export class CreateEventController {
  constructor(private readonly createEventService: CreateEventService) {}

  @Post()
  async handle(
    @Body() body: CreateEventRequestBody
  ): Promise<CreateEventResponseBody> {
    const command = new CreateEventCommand();
    const result = await this.createEventService.execute(command);

    const resBody = new CreateEventResponseBody({
      ok: result.ok,
    });
    return resBody;
  }
}
