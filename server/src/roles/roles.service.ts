import { Inject, Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { RoleEntity } from 'src/database/entities';
import { Repository } from 'typeorm';
import { Providers } from 'src/utils/constants';


@Injectable()
export class RolesService {
    constructor (
        @Inject(Providers.ROLE_REPOSITORY) 
        private readonly roleRepository: Repository<RoleEntity>,
    ) {}


    async createRole(dto: CreateRoleDto): Promise<RoleEntity> {
        const role = this.roleRepository.create(dto);
        return this.roleRepository.save(role);
    }


    async findRole(value: string): Promise<RoleEntity> {
        const role = await this.roleRepository.findOneBy({
            value
        });
        return role;
    }


    async getRoles(): Promise<RoleEntity[]> {
        return this.roleRepository.find();
    }
}
