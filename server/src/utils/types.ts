import { GroupEntity, GroupMessageEntity, UserEntity } from "src/database/entities";
import { Request } from 'express';
import { Socket } from 'socket.io';


export interface AuthenticatedRequest extends Request {
    user: UserEntity;
}

export interface AuthenticatedSocket extends Socket {
    user?: UserEntity;
}


export type FindUserParams = Partial<{
    id: number;
    email: string;
}>;

export type FindUserOptions = Partial<{
    selectAll: boolean;
}>;


export type CreateGroupParams = {
    name: string;
    owner: UserEntity;
    users: string[];
};

export type GetGroupsParams = {
    userId: number;
    search: string;
}

export type RemoveGroupParams = {
    owner: UserEntity;
    groupId: number;
};

export type CreateGroupMessageParams = {
    author: UserEntity;
    text: string;
    groupId: number;
}

export type CreateGroupMessageResponse = {
    message: GroupMessageEntity;
    group: GroupEntity;
};