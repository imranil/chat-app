import { IoAdapter } from '@nestjs/platform-socket.io';
import { AuthenticatedSocket } from '../utils/types';
import * as cookieParser from 'cookie-parser';
import * as cookie from 'cookie';
import { plainToInstance } from 'class-transformer';
import { SessionEntity, UserEntity } from 'src/database/entities';
import { dataSource } from 'src/database/data-source';


export class WebsocketAdapter extends IoAdapter {
    createIOServer(port: number, options?: any) {
        const sessionRepository = dataSource.getRepository(SessionEntity);
        const server = super.createIOServer(port, options);

        server.use(async (socket: AuthenticatedSocket, next) => {
            console.log('Inside Websocket Adapter');
            const { cookie: clientCookie } = socket.handshake.headers;
            if (!clientCookie) {
                console.log('Client has no cookies');
                return next(new Error('Not Authenticated. No cookies were sent'));
            }
            const { CHAT_APP_SESSION_ID } = cookie.parse(clientCookie);
            if (!CHAT_APP_SESSION_ID) {
                console.log('CHAT_APP_SESSION_ID DOES NOT EXIST');
                return next(new Error('Not Authenticated'));
            }
            const signedCookie = cookieParser.signedCookie(
                CHAT_APP_SESSION_ID,
                process.env.SESSION_SECRET,
            );
            if (!signedCookie) return next(new Error('Error signing cookie'));
            const sessionDB = await sessionRepository.findOneBy({ id: signedCookie });
            if (!sessionDB) return next(new Error('No session found'));
            const userFromJson = JSON.parse(sessionDB.json);
            if (!userFromJson.passport || !userFromJson.passport.user)
                return next(new Error('Passport or User object does not exist.'));
            const userDB = plainToInstance(
                UserEntity,
                JSON.parse(sessionDB.json).passport.user,
            );
            socket.user = userDB;
            next();
        });

        return server;
    }
}