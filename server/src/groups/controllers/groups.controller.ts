import { Body, Controller, Delete, Get, Param, Post, Query } from "@nestjs/common";
import { Routes } from "src/utils/constants";
import { GroupsService } from "../services/groups.service";
import { UserEntity } from "src/database/entities";
import { CreateGroupDto } from "../dto/create-group.dto";
import { AuthUser } from "src/utils/decorators/auth-user.decorator";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { GetGroupsDto } from "../dto/get-groups.dto";



@Controller(Routes.GROUPS)
export class GroupsController {
    constructor(
        private readonly groupsService: GroupsService,
        private eventEmitter: EventEmitter2,
    ) { }


    @Post()
    async createGroup(
        @AuthUser() user: UserEntity, 
        @Body() payload: CreateGroupDto
    ) {
        const group = await this.groupsService.createGroup({
            ...payload,
            owner: user,
        });
        this.eventEmitter.emit('group.create', group);
        return group;
    }


    @Get()
    getGroups(
        @AuthUser() user: UserEntity,
        @Query() dto: GetGroupsDto,
    ) {
        return this.groupsService.getGroups({
            userId: user.id,
            search: dto.search
        });
    }


    @Get(':id')
    getGroup(
        @Param('id') id: number
    ) {
        return this.groupsService.findGroupById(id);
    }


    @Delete(':id')
    removeGroup(
        @AuthUser() user: UserEntity, 
        @Param('id') id: number
    ) {
        return this.groupsService.removeGroup({owner: user, groupId: id});
    }
}