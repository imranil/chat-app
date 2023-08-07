import { Dispatch, FC, MouseEvent, ReactNode, SetStateAction } from "react";
import './index.scss';


interface ModalWindowLayoutProps {
    isActive: boolean;
    setIsActive: Dispatch<SetStateAction<boolean>>;
    children?: ReactNode | ReactNode[];
    className?: string;
}

const ModalWindowLayout: FC<ModalWindowLayoutProps> = ({
    isActive,
    setIsActive,
    children,
    className
}) => {
    return (
        <div
            className={["modal-window", className, isActive ? 'active' : ''].join(' ')}
            onClick={() => setIsActive(false)}
        >
            <div
                className="modal-window__content"
                onClick={(e: MouseEvent<HTMLDivElement>) => e.stopPropagation()}
            >
                {children}
            </div>
        </div>
    );
};


export default ModalWindowLayout;