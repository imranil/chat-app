import { FC, ReactNode } from 'react';
import './index.scss';


interface MessageItemLayoutProps {
    children?: ReactNode | ReactNode[];
    className?: string;
}


const MessageItemLayout: FC<MessageItemLayoutProps> = ({ children, className }) => {
    return (
        <div className={["message-item", className].join(' ')}>
            { children }
        </div>
    );
}


export default MessageItemLayout;


export const MessageItemDetailsLayout: FC<MessageItemLayoutProps> = ({ children, className }) => {
    return (
        <div className={["message-item__details", className].join(' ')}>
            { children }
        </div>
    );
}


export const MessageItemHeaderLayout: FC<MessageItemLayoutProps> = ({ children, className }) => {
    return (
        <div className={["message-item__header", className].join(' ')}>
            { children }
        </div>
    );
}


export const MessageItemBodyLayout: FC<MessageItemLayoutProps> = ({ children, className }) => {
    return (
        <div className={["message-item__body", className].join(' ')}>
            { children }
        </div>
    );
}