import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { RandomController } from './services/musics/random/random.controller';
import { InfosController } from './services/musics/infos/infos.controller';
import { RandomService } from './services/musics/random/random.service';
import { InfosService } from './services/musics/infos/infos.service';


import { ProfileInfosController } from './auth/profile/infos/infos.controller';
import { ProfileInfosService } from './auth/profile/infos/infos.service';
import { DatabaseService } from './database/database.service';
@Module({
  imports: [

    HttpModule
  ],
  controllers: [AppController, RandomController, InfosController, ProfileInfosController],
  providers: [AppService, RandomService, InfosService, ProfileInfosService, DatabaseService],
})
export class AppModule {}