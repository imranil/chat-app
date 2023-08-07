import { FC, ReactNode } from 'react';
import './index.scss';


interface PageLayoutProps {
    children: ReactNode | ReactNode[];
    className?: string;
    display?: string;
    justifyContent?: string;
    alignItems?: string;
}


const PageLayout: FC<PageLayoutProps> = ({
    children,
    className,
    display,
    justifyContent,
    alignItems
}) => {
    return (
        <div
            style={{ display: display, justifyContent: justifyContent, alignItems: alignItems }}
            className={['page', className].join(' ')}
        >
            {children}
        </div>
    );
}


export default PageLayout;