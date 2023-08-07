import { Controller } from '@nestjs/common';
import { Routes } from 'src/utils/constants';
import { UsersService } from './users.service';

@Controller(Routes.USERS)
export class UsersController {
    constructor(
        private readonly userService: UsersService,
    ) {}
}