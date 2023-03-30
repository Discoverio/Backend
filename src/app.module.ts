import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { KeycloakConnectModule } from 'nest-keycloak-connect';

@Module({
  imports: [
    KeycloakConnectModule.register({
      authServerUrl: 'http://localhost:8080/auth',
      realm: 'music',
      clientId: 'myclient',
      secret: 'MfPjzOFZt9grQbyk1LKnAsagPJgnvw9t',
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}