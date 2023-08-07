import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';
import * as session from 'express-session';
import * as passport from 'passport';
import { SessionEntity } from './database/entities';
import { TypeormStore } from 'connect-typeorm';
import { WebsocketAdapter } from './gateway/gateway.adapter';
import { dataSource } from './database/data-source';


async function bootstrap() {
  const PORT = parseInt(process.env.APP_PORT);
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const sessionRepository = dataSource.getRepository(SessionEntity);
  const adapter = new WebsocketAdapter(app);

  app.useWebSocketAdapter(adapter);
  app.setGlobalPrefix('api');
  app.enableCors({ origin: ['http://localhost:3000'], credentials: true });
  app.useGlobalPipes(new ValidationPipe());
  app.set('trust proxy', 'loopback');
  app.use( 
    session({
      secret: process.env.SESSION_SECRET,
      saveUninitialized: false,
      resave: false,
      name: 'CHAT_APP_SESSION_ID',
      cookie: {
        maxAge: 24 * 60 * 60 * 1000, // cookie expires 1 day later
      },
      store: new TypeormStore().connect(sessionRepository),
    })
  ); 

  app.use(passport.initialize());
  app.use(passport.session());

  try {
    await app.listen(PORT, () =>
      console.log(`Server started on port = ${PORT}`)
    );

  } catch (error) {
    console.log(error);
  }
}

bootstrap();