import { Body, Controller, Get, Post } from '@nestjs/common';
import { Routes } from 'src/utils/constants';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';

@Controller(Routes.ROLES)
export class RolesController {
    constructor(
        private readonly rolesService: RolesService
    ) {}


    @Post()
    createRole(@Body() dto: CreateRoleDto) {
        return this.rolesService.createRole(dto);
    }


    @Get()
    getRoles() {
        return this.rolesService.getRoles();
    }
}