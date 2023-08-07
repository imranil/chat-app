import { ChangeEvent, FC, FocusEvent, useEffect, useState } from 'react';
import { useTextInputValidationReturn } from '../../../utils/hooks/useTextInputValidation';
import './index.scss';


interface TextInputProps {
    value?: string;
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
    onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
    className?: string;
    id?: string;
    isDirty?: boolean;
    label?: string;
    name?: string;
    placeholder?: string;
    type?: 'text' | 'search' | 'email' | 'password';
    valid?: useTextInputValidationReturn;
    hideErrors?: boolean;
}


const TextInput: FC<TextInputProps> = ({
    value = '',
    onChange,
    onBlur,
    className,
    id,
    isDirty,
    label,
    name,
    placeholder,
    type = 'text',
    valid,
    hideErrors = false,
}) => {

    const [inputValidClassName, setInputValidClassName] = useState('');

    useEffect(() => {
        if (valid?.isValid.value && isDirty && !hideErrors) {
            setInputValidClassName('success');
        }
        else if (!valid?.isValid.value && isDirty && !hideErrors) {
            setInputValidClassName('error');
        }
    }, [valid, isDirty]);

    return (
        <div className={["text-input", inputValidClassName, className].join(' ')}>
            <label
                htmlFor={id}
                className="text-input__label"
            >
                {label}
            </label>
            <input
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                id={id}
                name={name}
                placeholder={placeholder}
                type={type}
                className="text-input__input"
            />
            <div className="text-input__errors">
                {!hideErrors && isDirty && valid && Object.values(valid).map((item, index) => {
                    return item.value && <div key={`error-${index}`} className="text-input__errors__error">{item?.message}</div>
                })}
            </div>
        </div>
    );
}


export default TextInput;