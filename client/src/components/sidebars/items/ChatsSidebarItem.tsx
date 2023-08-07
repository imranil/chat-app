import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { Group } from "../../../utils/types";
import { SidebarLayoutItem } from "../../../layouts/SidebarLayout";
import Avatar from "../../common/Avatar";


interface ChatsSidebarItemProps {
    chat: Group;
}


const ChatsSidebarItem: FC<ChatsSidebarItemProps> = ({ chat }) => {
    const MESSAGE_LENGTH_MAX = 50;
    const navigate = useNavigate();

    function getLastMessageContent(): string {
        const { lastMessageSent } = chat;
        if (lastMessageSent) {
            return lastMessageSent.text.length >= MESSAGE_LENGTH_MAX
                ? lastMessageSent.text.slice(0, MESSAGE_LENGTH_MAX)?.concat('...')
                : lastMessageSent.text
        }

        return '';
    }
    
    return (
        <SidebarLayoutItem
            onClick={() => navigate(`/chats/${chat.id}`)}
            className={["chat-sidebar__item"].join(' ')}
        >
            <Avatar 
            src={chat.avatar ? chat.avatar : ''}
            name={`${chat.name[0]}`}
            />
            <div className="details">
                <div className="name">
                    {chat.name} 
                </div>
                <div className="last-message">
                    {getLastMessageContent()}
                </div>
            </div>
        </SidebarLayoutItem>
    );
}


export default ChatsSidebarItem;