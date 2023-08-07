import { FC, ReactNode } from 'react';
import './index.scss';


interface MessagePanelLayoutProps {
    children?: ReactNode | ReactNode[];
    className?: string;
}


const MessagePanelLayout: FC<MessagePanelLayoutProps> = ({
    children,
    className,
}) => {

    return (
        <div className={["message-panel", className].join(' ')}>
            {children}
        </div>
    );
}

export default MessagePanelLayout;


export const MessagePanelLayoutHeader: FC<MessagePanelLayoutProps> = ({children, className}) => {
    return (
        <div className={["message-panel__header", className].join(' ')}>
            {children}
        </div>
    );
}

export const MessagePanelLayoutMain: FC<MessagePanelLayoutProps> = ({children, className}) => {
    return (
        <div className={["message-panel__main", className].join(' ')}>
            {children}
        </div>
    );
}

export const MessagePanelLayoutFooter: FC<MessagePanelLayoutProps> = ({children, className}) => {
    return (
        <div className={["message-panel__footer", className].join(' ')}>
            {children}
        </div>
    );
}