import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';


@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
    ) {}


    async validateUser(email: string, password: string) {
        const user = await this.usersService.findUser(
            { email },
            { selectAll: true },
        );
        if(!user) throw new HttpException('Invalid Credentials', HttpStatus.UNAUTHORIZED);
        const passwordEquals = await bcrypt.compare(password, user.password);
        
        return passwordEquals ? user : null;
    }
}