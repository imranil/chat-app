import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { GroupEntity, GroupMessageEntity } from "src/database/entities";
import { Providers } from "src/utils/constants";
import { Repository } from "typeorm";
import { GroupsService } from "./groups.service";
import { CreateGroupMessageParams } from "src/utils/types";
import { instanceToPlain } from "class-transformer";



@Injectable()
export class GroupMessagesService {
    constructor(
        @Inject(Providers.GROUP_MESSAGE_REPOSITORY)
        private readonly groupMessageRepository: Repository<GroupMessageEntity>,
        @Inject(Providers.GROUP_REPOSITORY)
        private readonly groupRepository: Repository<GroupEntity>,
        private readonly groupsService: GroupsService,
    ) { }


    async createGroupMessage(params: CreateGroupMessageParams) {
        const { text, author, groupId } = params;

        const group = await this.groupsService.findGroupById(groupId);
        if (!group) throw new HttpException('Group not found', HttpStatus.BAD_REQUEST);

        const findUser = group.users.find((user) => user.id === author.id);
        if (!findUser) throw new HttpException('The user is not a member of a group', HttpStatus.BAD_REQUEST);

        const groupMessage = this.groupMessageRepository.create({
            text,
            group,
            author: instanceToPlain(author),
        });
        const savedMessage = await this.groupMessageRepository.save(groupMessage);
        group.lastMessageSent = savedMessage;
        const updatedGroup = await this.groupsService.saveGroup(group);
        return { message: savedMessage, group: updatedGroup };
    }


    getGroupMessages(id: number): Promise<GroupMessageEntity[]> {
        return this.groupMessageRepository.find({
            where: { group: { id } },
            relations: ['author'],
            order: {
                createdAt: 'DESC',
            },
        });
    }
}