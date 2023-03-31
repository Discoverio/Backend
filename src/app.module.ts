import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { KeycloakConnectModule } from 'nest-keycloak-connect';
import { RandomController } from './services/musics/random/random.controller';
import { InfosController } from './services/musics/infos/infos.controller';
import { RandomService } from './services/musics/random/random.service';
import { InfosService } from './services/musics/infos/infos.service';
@Module({
  imports: [
    KeycloakConnectModule.register({
      authServerUrl: 'http://localhost:8080/auth',
      realm: 'music',
      clientId: 'myclient',
      secret: 'MfPjzOFZt9grQbyk1LKnAsagPJgnvw9t',
    }),
    HttpModule
  ],
  controllers: [AppController, RandomController, InfosController],
  providers: [AppService, RandomService, InfosService],
})
export class AppModule {}