


export enum Routes {
    AUTH = 'auth',
    USERS = 'users',
    USERS_PROFILES = 'users/profiles',
    ROLES = 'roles',
    GROUPS = 'groups',
    GROUP_MESSAGES = 'groups/:id/messages',
    GROUP_RECIPIENTS = 'groups/:id/recipients',
};


export enum Providers {
    DATA_SOURCE = 'DATA_SOURCE',
    USER_REPOSITORY = 'USER_REPOSITORY',
    ROLE_REPOSITORY = 'ROLE_REPOSITORY',
    GROUP_REPOSITORY = 'GROUP_REPOSITORY',
    GROUP_MESSAGE_REPOSITORY = 'GROUP_MESSAGE_REPOSITORY',
    GATEWAY_SESSION_MANAGER = 'GATEWAY_SESSION_MANAGER',
};


export enum Roles {
    ADMIN = 'ADMIN',
    USER = 'USER',
};