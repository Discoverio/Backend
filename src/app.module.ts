import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { RandomController } from './services/musics/random/random.controller';
import { InfosController } from './services/musics/infos/infos.controller';
import { RandomService } from './services/musics/random/random.service';
import { InfosService } from './services/musics/infos/infos.service';

@Module({
  imports: [AuthModule, UsersModule, HttpModule],
  controllers: [AppController, RandomController, InfosController],
  providers: [AppService, RandomService, InfosService],
})
export class AppModule {}
