import { AppSidebarRouteType } from "./types";
import ChatDotsIcon from '../assets/icons/chat-dots-icon.svg';
import GroupIcon from '../assets/icons/group-icon.svg';
import SettingsIcon from '../assets/icons/settings-icon.svg';



export const getUserSidebarIcon = (id: AppSidebarRouteType) => {
    switch (id) {
        case 'chats':
            return ChatDotsIcon;
        case 'friends':
            return GroupIcon;
        case 'settings':
            return SettingsIcon;
        default:
            return ChatDotsIcon;
    }
};


export const ArrayNotEmpty = (array: any[]) => {
    return array.length !== 0;
}