import { Controller, Post, Body, Session } from '@nestjs/common';
import { AppService } from './app.service';
import { OAuth2Client } from 'google-auth-library'; // Import the OAuth2Client
import { SessionService } from './services/musics/sessions/session.service';
@Controller()
export class AppController {
  private client: OAuth2Client;

  constructor(
    private readonly appService: AppService,
    private readonly sessionService: SessionService
  ) {
    this.client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
  }
  

  @Post('/login')
  async login(@Body('token') token, @Session() session): Promise<any> {
    const ticket = await this.client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    console.log(ticket.getPayload(), 'ticket');
    const payload = ticket.getPayload();
    const userId = payload['sub'];
    const objectUserId = await this.appService.getUserIdFromSub(userId);
    // Check if the session object exists, if not, initialize it
    if (!session) {
      session = {};
    }

    // Set the objectUserId property
    session.objectUserId = objectUserId;
    this.sessionService.setObjectUserId(objectUserId);
    console.log('Utilisateur actuellement connecté : ' + session.objectUserId);
    const history = { musics: { liked: [], unliked: [], done: [] } };
    const stats = { credits: { $numberLong: '' }, performed_activities: { $numberLong: '' } };
    const { email, sub, given_name, family_name, picture } = ticket.getPayload();
    const data = await this.appService.login({ email, sub, given_name, family_name, image: picture, stats, history });
    return {
      data,
      message: 'success',
    };
  }

}
