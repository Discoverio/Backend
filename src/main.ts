import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const corsOptions = {
    origin: process.env.REACT_APP_FRONT_ADRESS,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
  };
  
  app.use(cors(corsOptions));
  
  await app.listen(3000);
}
bootstrap();