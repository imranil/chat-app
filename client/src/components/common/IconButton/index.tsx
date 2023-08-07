import { FC, MouseEvent } from 'react';
import './index.scss';


interface IconButtonProps {
    src: string;
    className?: string;
    width?: number;
    height?: number;
    onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
}


const IconButton: FC<IconButtonProps> = ({
    src,
    className,
    width=40,
    height=40,
    onClick
}) => {
    return (
        <button 
            onClick={onClick}
            style={{width: width, height: height}}
            className={['icon-button', className].join(' ')}
        >
            <img src={src} alt="icon" />
        </button>
    );
}


export default IconButton;