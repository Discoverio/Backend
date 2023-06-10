import { Injectable } from '@nestjs/common';

@Injectable()
export class SessionService {
  private objectUserId: string;

  setObjectUserId(objectUserId: string): void {
    this.objectUserId = objectUserId;
  }

  getObjectUserId(): string {
    return this.objectUserId;
  }
}
