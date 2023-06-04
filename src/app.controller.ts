import { Controller, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { OAuth2Client } from 'google-auth-library'; // Import the OAuth2Client

@Controller()
export class AppController {

  private client: OAuth2Client; // Declare a private instance variable
  
  constructor(private readonly appService: AppService) {
    this.client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID); // Initialize the OAuth2Client
  }
  
  @Post('/login')
  async login(@Body('token') token): Promise<any> {
    const ticket = await this.client.verifyIdToken({ // Use the initialized client
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    console.log(ticket.getPayload(), 'ticket');
    const { email, name, picture } = ticket.getPayload();
    const data = await this.appService.login({ email, name, image: picture });
    return {
      data,
      message: 'success',
    };
  }
}