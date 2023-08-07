import { ConnectedSocket, MessageBody, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { GroupsService } from "src/groups/services/groups.service";
import { Server, Socket } from 'socket.io';
import { AuthenticatedSocket, CreateGroupMessageResponse } from "src/utils/types";
import { OnEvent } from "@nestjs/event-emitter";
import { GroupEntity, GroupMessageEntity } from "src/database/entities";
import { Providers } from "src/utils/constants";
import { Inject } from "@nestjs/common";
import { GatewaySessionManager } from "./gateway.session";


@WebSocketGateway({
    cors: {
        origin: ['http://localhost:3000'],
        credentials: true,
    },
    pingInterval: 10000,
    pingTimeout: 15000,
})
export class MessagingGateway implements OnGatewayConnection, OnGatewayDisconnect {
    constructor(
        @Inject(Providers.GATEWAY_SESSION_MANAGER)
        readonly sessions: GatewaySessionManager,
        private readonly groupsService: GroupsService,
    ) { }


    @WebSocketServer()
    server: Server;

    handleConnection(socket: AuthenticatedSocket, ...args: any[]) {
        console.log('Incoming Connection');
        this.sessions.setUserSocket(socket.user.id, socket);
        socket.emit('connected', {});
    }

    handleDisconnect(socket: AuthenticatedSocket) {
        console.log('handleDisconnect');
        console.log(`${socket.user.email} disconnected.`);
        this.sessions.removeUserSocket(socket.user.id);
    }

    @SubscribeMessage('getGroupUsers')
    async handleGetGroupUsers(
        @MessageBody() data: any,
        @ConnectedSocket() socket: AuthenticatedSocket,
    ) {
        const group = await this.groupsService.findGroupById(
            parseInt(data.groupId),
        );
        if (!group) return;
        const onlineUsers = [];
        const offlineUsers = [];
        group.users.forEach((user) => {
            const socket = this.sessions.getUserSocket(user.id);
            socket ? onlineUsers.push(user) : offlineUsers.push(user);
        });
        socket.emit('groupUsersReceived', { onlineUsers, offlineUsers });
    }

    @SubscribeMessage('onGroupJoin')
    onGroupJoin(
        @MessageBody() data: any,
        @ConnectedSocket() client: AuthenticatedSocket,
    ) {
        console.log('onGroupJoin');
        client.join(`group-${data.groupId}`);
        console.log(client.rooms);
        client.to(`group-${data.groupId}`).emit('userGroupJoin');
    }

    @SubscribeMessage('onGroupLeave')
    onGroupLeave(
        @MessageBody() data: any,
        @ConnectedSocket() client: AuthenticatedSocket,
    ) {
        console.log('onGroupLeave');
        client.leave(`group-${data.groupId}`);
        console.log(client.rooms);
        client.to(`group-${data.groupId}`).emit('userGroupLeave');
    }

    @OnEvent('group.create')
    handleGroupCreate(payload: GroupEntity) {
        console.log('group.create event');
        payload.users.forEach((user) => {
            const socket = this.sessions.getUserSocket(user.id);
            socket && socket.emit('onGroupCreate', payload);
        });
    }

    @OnEvent('group.message.create')
    async handleGroupMessageCreate(payload: CreateGroupMessageResponse) {
        const { id } = payload.group;
        console.log('Inside group.message.create');
        this.server.to(`group-${id}`).emit('onGroupMessage', payload);
    }

    @OnEvent('group.message.update')
    handleGroupMessageUpdate(payload: GroupMessageEntity) {
        const room = `group-${payload.group.id}`;
        console.log(room);
        this.server.to(room).emit('onGroupMessageUpdate', payload);
    }
}