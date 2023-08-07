import { MouseEvent, FC } from 'react';
import './index.scss';


interface ButtonProps {
    title?: string;
    onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
    isDisabled?: boolean;
    className?: string;
}


const Button: FC<ButtonProps> = ({
    title,
    onClick,
    isDisabled,
    className
}) => {
    return (
        <button
            onClick={onClick}
            className={['button', className].join(' ')}
            disabled={isDisabled}
        >
            {title}
        </button>
    );
}


export default Button;