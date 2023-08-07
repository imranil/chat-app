import { FC, MouseEvent, ReactNode } from 'react';
import './index.scss';


interface SidebarLayoutProps {
    children?: ReactNode | ReactNode[];
    className?: string;
    onClick?: (event: MouseEvent<HTMLDivElement>) => void;
}


const SidebarLayout: FC<SidebarLayoutProps> = ({
    children,
    className
}) => {

    return (
        <div className={["sidebar", className].join(' ')}>
            <div className="sidebar__content">
                {children}
            </div>
        </div>
    );
}


export default SidebarLayout;


export const SidebarLayoutHeader: FC<SidebarLayoutProps> = ({children, className}) => {
    return (
        <div className={["sidebar__header", className].join(' ')}>
            {children}
        </div>
    );
}


export const SidebarLayoutMain: FC<SidebarLayoutProps> = ({children, className}) => {
    return (
        <div className={["sidebar__main", className].join(' ')}>
            {children}
        </div>
    );
}

export const SidebarLayoutFooter: FC<SidebarLayoutProps> = ({children, className}) => {
    return (
        <div className={["sidebar__footer", className].join(' ')}>
            {children}
        </div>
    );
}


export const SidebarLayoutItem: FC<SidebarLayoutProps> = ({children, className, onClick}) => {
    return (
        <div 
            onClick={onClick}
            className={["sidebar__item", className].join(' ')}
        >
            {children}
        </div>
    )
}