import { FC } from "react";
import { useSelector } from "react-redux";
import Avatar from "../common/Avatar";
import MessageItemLayout, { MessageItemBodyLayout, MessageItemDetailsLayout, MessageItemHeaderLayout } from "../../layouts/MessageItemLayout";
import { RootState } from "../../store";
import { GroupMessage } from "../../utils/types";


interface MessageItemProps {
    message: GroupMessage;
}


const MessageItem: FC<MessageItemProps> = ({ message }) => {
    const currentUser = useSelector((state: RootState) => state.user.currentUser);

    const isOwnedByCurrentUser = (): boolean => {
        return message.userId === currentUser.id;
    };

    return (
        <MessageItemLayout
            className={isOwnedByCurrentUser() ? 'is-current-user' : ''}
        >
            <Avatar
                src={message.author.avatar ? message.author.avatar : ''}
                name={`${message.author.firstname[0]}${message.author.lastname[0]}`}
            />
            <MessageItemDetailsLayout>
                <MessageItemHeaderLayout>
                    <div className="author">
                        {message.author.firstname + ' ' + message.author.lastname}
                    </div>
                    <div className="time">
                        {message.createdAt}
                    </div>
                </MessageItemHeaderLayout>
                <MessageItemBodyLayout>
                    <div className="text">
                        {message.text}
                    </div>
                </MessageItemBodyLayout>
            </MessageItemDetailsLayout>
        </MessageItemLayout>
    );
}


export default MessageItem;