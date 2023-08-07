import { Body, Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { Routes } from 'src/utils/constants';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { instanceToPlain } from 'class-transformer';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthenticatedRequest } from 'src/utils/types';
import { AuthUser } from 'src/utils/decorators/auth-user.decorator';
import { UserEntity } from 'src/database/entities';
import { AuthGuard } from './guards/auth.guard';
import { Response } from 'express';


@Controller(Routes.AUTH)
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly usersService: UsersService,
    ) { }


    @Post('register')
    async register(@Body() createUserDto: CreateUserDto) {
        return instanceToPlain(await this.usersService.createUser(createUserDto));
    }


    @UseGuards(LocalAuthGuard)
    @Post('login')
    login(@AuthUser() user: UserEntity) {
        const { password, ...result } = user;
        return result;
    }


    @UseGuards(AuthGuard)
    @Post('logout')
    logout(@Req() req: AuthenticatedRequest, @Res() res: Response) {
        req.logout((err) => {
            return err ? res.sendStatus(400) : res.sendStatus(200);
        });
    }
}