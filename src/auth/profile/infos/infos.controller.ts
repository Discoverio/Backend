import { Controller, Get, Param, Body, Post, Delete } from '@nestjs/common';
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

    @Get('/profile/hystory/musics/done/:profile_id')
    async getDoneMusics(@Param('profile_id') profile_id: string) {
      return this.profileInfosService.getDoneMusics(profile_id);
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

    @Post('/profile/history/musics/liked/:profile_id')
    updateLikedMusicId(@Param('profile_id') profile_id: string, @Body() requestBody: { id: string }) {
      const currentId = requestBody.id;
      // Effectuez les opérations nécessaires avec l'ID aimé (par exemple, enregistrement en base de données, etc.)
      console.log(`ID aimé mis à jour : ${currentId} pour l'utilisateur n°  ${profile_id}`);
      // Vous pouvez retourner une réponse appropriée si nécessaire
      this.profileInfosService.setLikedMusic(profile_id,currentId);
    }

    @Delete('/profile/history/musics/liked/:profile_id')
    deleteLikedMusicId(@Param('profile_id') profile_id: string, @Body() requestBody: { id: string }) {
      const currentId = requestBody.id;
      // Perform the necessary operations to remove the liked ID from the database
      console.log(`ID aimé à supprimer : ${currentId} pour l'utilisateur n° ${profile_id}`);
      // You can return an appropriate response if needed
      this.profileInfosService.removeLikedMusic(profile_id, currentId);
    }    





    @Post('/profile/history/musics/unliked/:profile_id')
    updateUnLikedMusicId(@Param('profile_id') profile_id: string, @Body() requestBody: { id: string }) {
      const currentId = requestBody.id;
      // Effectuez les opérations nécessaires avec l'ID aimé (par exemple, enregistrement en base de données, etc.)
      console.log(`ID non-aimé mis à jour : ${currentId} pour l'utilisateur n°  ${profile_id}`);
      // Vous pouvez retourner une réponse appropriée si nécessaire
      this.profileInfosService.setUnLikedMusic(profile_id,currentId);
    }

    @Delete('/profile/history/musics/unliked/:profile_id')
    deleteUnLikedMusicId(@Param('profile_id') profile_id: string, @Body() requestBody: { id: string }) {
      const currentId = requestBody.id;
      // Perform the necessary operations to remove the liked ID from the database
      console.log(`ID non-aimé à supprimer : ${currentId} pour l'utilisateur n° ${profile_id}`);
      // You can return an appropriate response if needed
      this.profileInfosService.removeUnLikedMusic(profile_id, currentId);
    }    




    
    @Post('/profile/history/musics/done/:profile_id')
    updateDoneMusicId(@Param('profile_id') profile_id: string, @Body() requestBody: { id: string }) {
      const currentId = requestBody.id;
      // Effectuez les opérations nécessaires avec l'ID aimé (par exemple, enregistrement en base de données, etc.)
      console.log(`ID «réalisée» mis à jour : ${currentId} pour l'utilisateur n°  ${profile_id}`);
      // Vous pouvez retourner une réponse appropriée si nécessaire
      this.profileInfosService.setDoneMusic(profile_id,currentId);
    }

    @Delete('/profile/history/musics/done/:profile_id')
    deleteDoneMusicId(@Param('profile_id') profile_id: string, @Body() requestBody: { id: string }) {
      const currentId = requestBody.id;
      // Perform the necessary operations to remove the liked ID from the database
      console.log(`ID «réalisée» à supprimer : ${currentId} pour l'utilisateur n° ${profile_id}`);
      // You can return an appropriate response if needed
      this.profileInfosService.unsetDoneMusic(profile_id, currentId);
    }    





}
