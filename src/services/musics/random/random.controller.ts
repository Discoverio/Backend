import { Controller, Get } from '@nestjs/common';
import { RandomService } from './random.service';

@Controller()
export class RandomController {
  constructor(private readonly randomService: RandomService) {}

  @Get('/random')
  async getRandomAlbum() {
    return this.randomService.getRandomAlbum();
  }
}
