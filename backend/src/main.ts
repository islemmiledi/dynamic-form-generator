import 'dotenv/config'
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  
  const port = process.env.PORT || 4000;

  app.use(cors({
    origin: '*', 
    credentials: true, 
  }));

  await app.listen(port);
}
bootstrap();
