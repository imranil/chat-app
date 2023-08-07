import { User, AppSidebarItemType } from "./types";



export enum Paths {
    APP = '/*',
    LOGIN = '/login',
    REGISTER = '/register',
    CHATS = 'chats'
};


export enum SelectableTheme {
    LIGHT = 'light',
    DARK = 'dark'
};


export const NotAuthUser: User = {
    id: 0,
    email: '',
    firstname: '',
    lastname: '',
    avatar: '',
    roles: [],
};


export const appSidebarItems: AppSidebarItemType[] = [
    {
        id: 'chats',
        path: '/chats'
    },
    {
        id: 'friends',
        path: '/friends'
    },
    {
        id: 'settings',
        path: '/settings'
    }
]