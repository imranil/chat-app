import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { UserEntity } from 'src/database/entities';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { FindUserOptions, FindUserParams } from 'src/utils/types';
import { RolesService } from 'src/roles/roles.service';
import { Providers, Roles } from 'src/utils/constants';


@Injectable()
export class UsersService {
    constructor(
        @Inject(Providers.USER_REPOSITORY) 
        private readonly userRepository: Repository<UserEntity>,
        private readonly rolesService: RolesService,    
    ) { }


    async createUser(dto: CreateUserDto): Promise<UserEntity> {
        const candidate = await this.userRepository.findOneBy({
            email: dto.email
        });
        if (candidate) throw new HttpException('A user with this email address already exists!', HttpStatus.BAD_REQUEST);

        const saltOrRounds = 10;
        const hashPassword = await bcrypt.hash(dto.password, saltOrRounds);
        const newUser = this.userRepository.create({ ...dto, password: hashPassword });
        
        const role = await this.rolesService.findRole(Roles.USER);
        if (!role) throw new HttpException('Role "USER" does not exist!', HttpStatus.INTERNAL_SERVER_ERROR);
        newUser.roles = [role];

        return this.userRepository.save(newUser);
    }


    async removeUser(id: number): Promise<void> {
        const user = await this.findUser({ id }, { selectAll: true });
        if(!user) throw new HttpException('User does not exist!', HttpStatus.BAD_REQUEST);

        this.userRepository.remove(user);
    } 


    async findUser(
        params: FindUserParams,
        options?: FindUserOptions,
    ): Promise<UserEntity> {
        const selections: (keyof UserEntity)[] = [
            'id',
            'email',
            'firstname',
            'lastname',
        ];
        const selectionsWithPassword: (keyof UserEntity)[] = [...selections, 'password'];
        return this.userRepository.findOne({
            where: {
                ...params
            },
            select: options?.selectAll ? selectionsWithPassword : selections,
        });
    }


    async saveUser(user: UserEntity): Promise<UserEntity> {
        return this.userRepository.save(user);
    }
}