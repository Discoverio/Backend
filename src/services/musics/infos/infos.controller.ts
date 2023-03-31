import { Controller, Get, Param } from '@nestjs/common';
import { InfosService } from './infos.service';

@Controller()
export class InfosController {
  constructor(private readonly infosService: InfosService) {}

  @Get('/infos/album/year/:deezer_album_id')
  async getAlbumYear(@Param('deezer_album_id') deezer_album_id: string) {
    return this.infosService.getAlbumYear(deezer_album_id);
  }

  // getArtistPicture

  // getArtistFans

  // getExplicit
  @Get('/infos/album/explicit/:deezer_album_id')
  async isExplicit_lyrics(@Param('deezer_album_id') deezer_album_id: string) {
      return this.infosService.isExplicit_lyrics(deezer_album_id);
  }

}

