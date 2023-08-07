import { Body, Controller, Get, HttpException, HttpStatus, Param, ParseIntPipe, Post } from "@nestjs/common";
import { Routes } from "src/utils/constants";
import { AuthUser } from "src/utils/decorators/auth-user.decorator";
import { GroupMessagesService } from "../services/group-messages.service";
import { UserEntity } from "src/database/entities";
import { CreateGroupMessageDto } from "../dto/create-group-message.dto";
import { EventEmitter2 } from "@nestjs/event-emitter";



@Controller(Routes.GROUP_MESSAGES)
export class GroupMessagesController {
    constructor(
        private readonly groupMessagesService: GroupMessagesService,
        private readonly eventEmitter: EventEmitter2,
    ) { }


    @Post()
    async createGroupMessage(
        @AuthUser() user: UserEntity,
        @Param('id', ParseIntPipe) id: number,
        @Body() { text }: CreateGroupMessageDto,
    ) {
        if (!text) throw new HttpException('Message must not be empty', HttpStatus.BAD_REQUEST);
        const params = { groupId: id, author: user, text };
        const response = await this.groupMessagesService.createGroupMessage(params);
        this.eventEmitter.emit('group.message.create', response);
        return;
    }


    @Get()
    async getGroupMessages(
        @AuthUser() user: UserEntity,
        @Param('id', ParseIntPipe) id: number,
    ) {
        const messages = await this.groupMessagesService.getGroupMessages(id);
        return { id, messages };
    }
}