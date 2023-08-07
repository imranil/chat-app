import { ChangeEvent, FC, FocusEvent, useEffect, useState } from "react";
import { useTextInputValidationReturn } from "../../../utils/hooks/useTextInputValidation";
import './index.scss';


interface TextAreaProps {
    value?: string;
    onChange?: (event: ChangeEvent<HTMLTextAreaElement>) => void;
    onBlur?: (event: FocusEvent<HTMLTextAreaElement>) => void;
    className?: string;
    id?: string;
    isDirty?: boolean;
    label?: string;
    name?: string;
    placeholder?: string;
    rows?: number;
    cols?: number;
    valid?: useTextInputValidationReturn;
}


const TextArea: FC<TextAreaProps> = ({
    value = '',
    onChange,
    onBlur,
    className,
    id,
    isDirty,
    label,
    name,
    placeholder,
    rows=1,
    cols,
    valid
}) => {

    const [inputValidClassName, setInputValidClassName] = useState('');

    useEffect(() => {
        if (valid?.isValid.value && isDirty) {
            setInputValidClassName('success');
        }
        else if (!valid?.isValid.value && isDirty) {
            setInputValidClassName('error');
        }
    }, [valid, isDirty]);

    return (
        <div className={["textarea", inputValidClassName, className].join(' ')}>
            <label
                htmlFor={id}
                className="textarea__label"
            >
                {label}
            </label>
            <textarea
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                id={id}
                name={name}
                placeholder={placeholder}
                className="textarea__input"
                rows={rows}
                cols={cols}
            />
            <div className="textarea__errors">
                {isDirty && valid && Object.values(valid).map((item, index) => {
                    return item.value && <div key={`error-${index}`} className="text-input__errors__error">{item?.message}</div>
                })}
            </div>
        </div>
    );
}


export default TextArea;