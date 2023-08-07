


export type User = {
    id: number;
    email: string;
    firstname: string;
    lastname: string;
    avatar?: string;
    roles: Role[];
};

export type CreateUserParams = {
    email: string;
    firstname: string;
    lastname: string;
    password: string;
};

export type CredentialsUserParams = {
    email: string;
    password: string;
};


export type Role = {
    id: number;
    value: string;
    description: string;
};


export type AppSidebarRouteType =
  | 'chats'
  | 'friends'
  | 'settings';

export type AppSidebarItemType = {
    id: AppSidebarRouteType;
    path: string;
};


export type Message = {
    id: number;
    text: string;
    userId: number;
    author: User;
    createdAt: string;
    updatedAt: string;
};

export type Group = {
    id: number;
    name: string;
    owner: User;
    users: User[];
    messages: Message[]; 
    lastMessageSent: Message;
    createdAt: string;
    updatedAt: string;
    avatar?: string; 
};

export type CreateGroupParams = {
    name: string;
    users: string[];
};

export type GroupMessage = {
    id: number;
    text: string;
    userId: number;
    author: User;
    createdAt: string;
    updatedAt: string;
    groupId: number;
};

export type CreateGroupMessageParams = {
    text: string;
};

export type GroupMessagesPayload = {
    id: number;
    messages: GroupMessage[];
};


export type GroupMessageEventPayload = {
    group: Group;
    message: GroupMessage;
};


export type GroupMessagesType = {
    id: number;
    messages: GroupMessage[];
};