import { Controller, Get, Param } from '@nestjs/common';
import { ProfileInfosService } from './infos.service';



@Controller('infos')
export class ProfileInfosController {
  constructor(private readonly profileInfosService: ProfileInfosService) {}

    @Get('/profile/hystory/musics/liked/:profile_id')
    async getLikedMusics(@Param('profile_id') profile_id: string) {
      return this.profileInfosService.getLikedMusics(profile_id);
    }

    @Get('/profile/hystory/musics/unliked/:profile_id')
    async getUnLikedMusics(@Param('profile_id') profile_id: string) {
      return this.profileInfosService.getUnLikedMusics(profile_id);
    }    

    @Get('/profile/hystory/musics/:profile_id')
    async getAllMusics(@Param('profile_id') profile_id: string) {
      return this.profileInfosService.getAllMusics(profile_id);
    }

    @Get('/profile/stats/credits/:profile_id')
    async getUserCredits(@Param('profile_id') profile_id: string) {
      return this.profileInfosService.getUserCredits(profile_id);
    }

    @Get('/profile/stats/performed_activites/:profile_id')
    async getUserPerformedActivities(@Param('profile_id') profile_id: string) {
      return this.profileInfosService.getUserPerformedActivities(profile_id);
    }

    @Get('/profile/firstname/:profile_id')
    async getFirstNameOfUser(@Param('profile_id') profile_id: string) {
      return this.profileInfosService.getFirstNameOfUser(profile_id);
    }

    @Get('/profile/lastname/:profile_id')
    async getLastNameOfUser(@Param('profile_id') profile_id: string){
      return this.profileInfosService.getLastNameOfUser(profile_id);
    }

}
