import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { GroupEntity } from "src/database/entities";
import { UsersService } from "src/users/users.service";
import { Providers } from "src/utils/constants";
import { CreateGroupParams, GetGroupsParams, RemoveGroupParams } from "src/utils/types";
import { Repository } from "typeorm";



@Injectable()
export class GroupsService {
    constructor(
        @Inject(Providers.GROUP_REPOSITORY)
        private readonly groupRepository: Repository<GroupEntity>,
        private readonly usersService: UsersService,
    ) { }


    async createGroup(params: CreateGroupParams) {
        const { owner, name } = params;
        const usersPromise = params.users.map((email) => 
            this.usersService.findUser({ email }),
        );
        const users = (await Promise.all(usersPromise)).filter((user) => user);
        users.push(owner);
        const groupParams = { owner, users, name };
        const group = this.groupRepository.create(groupParams);
        return this.groupRepository.save(group);
    }


    async removeGroup(params: RemoveGroupParams) {
        const group = await this.groupRepository.findOne({
            where: {
                id: params.groupId,
            },
            relations: [
                'owner',
            ],
        })
        if(!group) throw new HttpException('Group does not exist', HttpStatus.BAD_REQUEST);
        if(group.owner.id !== params.owner.id) throw new HttpException('No access', HttpStatus.FORBIDDEN);

        return this.groupRepository.remove(group);
    }


    getGroups(params: GetGroupsParams): Promise<GroupEntity[]> {
        const { userId, search } = params;

        return this.groupRepository
            .createQueryBuilder('groups')
            .leftJoinAndSelect('groups.users', 'user')
            .where('user.id IN (:users)', { users: userId })
            .andWhere('groups.name like :search', { search: `%${ search }%` })
            .leftJoinAndSelect('groups.users', 'users')
            .leftJoinAndSelect('groups.owner', 'owner')
            .leftJoinAndSelect('groups.lastMessageSent', 'lastMessageSent')
            .orderBy('groups.lastMessageSentAt', 'DESC')
            .getMany();
    }


    findGroupById(id: number): Promise<GroupEntity> {
        return this.groupRepository.findOne({
            where: { id },
            relations: [
                'users',
                'lastMessageSent',
                'owner',
            ],
        });
    }


    saveGroup(group: GroupEntity): Promise<GroupEntity> {
        return this.groupRepository.save(group);
    }
}