import { Controller, Get, Param } from '@nestjs/common';
import { RandomService } from './random.service';


@Controller()
export class RandomController {
  constructor(private readonly randomService: RandomService) {}

  @Get('/random')
  async getRandomAlbum() {
    return this.randomService.getRandomAlbum();
  }

  // @Get('/music/random')
  // async getRandomAlbumId() {
  //   return this.randomService.getRandomAlbumId(); 
  // }
  @Get('/music/random/:userId')
  async getRandomAlbumId(@Param('userId') userId: string) {
    return this.randomService.getRandomAlbumId(userId);
  }

}
