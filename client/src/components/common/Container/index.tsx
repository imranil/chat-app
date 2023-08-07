import { FC, ReactNode } from 'react';
import './index.scss';


interface ContainerProps {
    children: ReactNode | ReactNode[];
}


const Container: FC<ContainerProps> = ({ children }) => {
    return (
        <div className="container">
            {children}
        </div>
    );
}


export default Container;