import { Controller, Get, Param } from '@nestjs/common';
import { InfosService } from './infos.service';

@Controller()
export class InfosController {
  constructor(private readonly infosService: InfosService) {}

  @Get('/infos/album/title/:deezer_album_id')
  async getAlbumTitle(@Param('deezer_album_id') deezerAlbumId: string): Promise<string> {
    const albumId = parseInt(deezerAlbumId);
    return this.infosService.getNameOfAlbumId(albumId);
  }

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

  @Get('/infos/album/genre/:deezer_album_id')
  async getAlbumGenre(@Param('deezer_album_id') deezer_album_id: string) {
      return this.infosService.getAlbumGenre(deezer_album_id);
  }

}


