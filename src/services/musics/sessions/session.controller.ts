import { Controller, Get } from '@nestjs/common';
import { SessionService } from './session.service';

@Controller()
export class SessionController {
  constructor(private readonly sessionService: SessionService) {}

  @Get('/session/userId')
  getSessionUserId(): string {
    const objectUserId = this.sessionService.getObjectUserId();
    return objectUserId;
  }
}
