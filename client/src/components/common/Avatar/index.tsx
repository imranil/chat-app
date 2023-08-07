import { FC, MouseEvent } from 'react'
import { API_URL } from '../../../utils/api';
import './index.scss';


interface AvatarProps {
    src: string;
    name: string;
    width?: number;
    height?: number;
    className?: string;
    onClick?: (event: MouseEvent<HTMLDivElement>) => void;
}


const Avatar: FC<AvatarProps> = ({
    src,
    name,
    width = 40,
    height = 40,
    className,
    onClick
}) => {

    function hasAvatar(): boolean {
        return src.length > 0;
    }

    function getDefaultAvatar(): string {
        return name.toUpperCase()
    }

    return (
        <div
            onClick={onClick}
            style={{ width: width, height: height }}
            className={["avatar", className].join(' ')}
        >
            {hasAvatar()
                ? <img src={API_URL.concat(src)} alt="avatar" />
                : <span>{getDefaultAvatar()}</span>
            }
        </div>
    );
}


export default Avatar;