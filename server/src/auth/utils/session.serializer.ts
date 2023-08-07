import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { UserEntity } from 'src/database/entities';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class SessionSerializer extends PassportSerializer {
    constructor(
        private readonly userService: UsersService,
    ) {
        super();
    }


    serializeUser(user: UserEntity, done: Function) {
        done(null, user);
    }

    
    async deserializeUser(user: UserEntity, done: Function) {
        const userDb = await this.userService.findUser({ id: user.id });
        return userDb ? done(null, userDb) : done(null, null);
    }
}