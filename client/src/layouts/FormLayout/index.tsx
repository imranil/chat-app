import { FC, FormEvent, ReactNode } from 'react';
import './index.scss';


interface FormLayoutProps {
    children?: ReactNode | ReactNode[];
    className?: string;
    onSubmit?: (event: FormEvent<HTMLFormElement>) => void;
}


const FormLayout: FC<FormLayoutProps> = ({
    children,
    className,
    onSubmit
}) => {

    return (
        <form onSubmit={onSubmit} className={["form", className].join(' ')}>
            <div className="form__content">
                {children}
            </div>
        </form>
    );
}


export default FormLayout;

export const FormLayoutHeader: FC<FormLayoutProps> = ({ children, className }) => {
    return (
        <div className={["form__header", className].join(' ')}>
            {children}
        </div>
    );
}

export const FormLayoutMain: FC<FormLayoutProps> = ({ children, className }) => {
    return (
        <div className={["form__main", className].join(' ')}>
            {children}
        </div>
    );
}

export const FormLayoutFooter: FC<FormLayoutProps> = ({ children, className }) => {
    return (
        <div className={["form__footer", className].join(' ')}>
            {children}
        </div>
    );
}