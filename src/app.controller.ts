import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard, ResourceGuard } from 'nest-keycloak-connect/keycloak-connect.module';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  
  @Get()
  @UseGuards(AuthGuard, ResourceGuard)
  getHello(): string {
    return this.appService.getHello();
  }
}