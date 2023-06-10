import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { Profile, ProfileSchema } from './auth/profile/profile.schema';
import { RandomController } from './services/musics/random/random.controller';
import { InfosController } from './services/musics/infos/infos.controller';
import { RandomService } from './services/musics/random/random.service';
import { InfosService } from './services/musics/infos/infos.service';
import { ProfileInfosController } from './auth/profile/infos/infos.controller';
import { ProfileInfosService } from './auth/profile/infos/infos.service';
import { DatabaseService } from './database/database.service';
import { SessionService } from './services/musics/sessions/session.service';
import { SessionController } from './services/musics/sessions/session.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    MongooseModule.forRoot(process.env.MONGO_URI),
    MongooseModule.forFeature([{ name: Profile.name, schema: ProfileSchema }]),
    HttpModule
  ],
  controllers: [AppController, RandomController, InfosController, ProfileInfosController, SessionController],
  providers: [AppService, RandomService, InfosService, ProfileInfosService, DatabaseService, SessionService],
})
export class AppModule {}