import { useEffect, useState } from "react"


export interface ITextInputValidations {
    minLength?: number;
    maxLength?: number;
    isRequired?: boolean;
    isEmail?: boolean;
}


export interface IError {
    value: boolean;
    message?: string;
}


const useTextInputValidation = (value: string, validations: ITextInputValidations) => {

    const [minLengthError, setMinLengthError] = useState<IError>({ value: false, message: `The field must contain ${validations.minLength} characters!` });
    const [maxLengthError, setMaxLengthError] = useState<IError>({ value: false, message: `The field must not contain more than ${validations.maxLength} characters!` });
    const [requiredError, setRequiredError] = useState<IError>({ value: true, message: 'The field is required!' });
    const [emailError, setEmailError] = useState<IError>({ value: false, message: 'The field is not a valid email address!' });
    const [isValid, setIsValid] = useState<IError>({ value: false });


    useEffect(() => {
        for (const validation in validations) {
            switch (validation) {
                case 'minLength':
                    (validations.minLength && value.length < validations.minLength) ?
                        setMinLengthError({ ...minLengthError, value: true }) :
                        setMinLengthError({ ...minLengthError, value: false })
                    break;
                case 'maxLength':
                    (validations.maxLength && value.length > validations.maxLength) ?
                        setMaxLengthError({ ...maxLengthError, value: true }) :
                        setMaxLengthError({ ...maxLengthError, value: false })
                    break;
                case 'isRequired':
                    value ?
                        setRequiredError({ ...requiredError, value: false }) :
                        setRequiredError({ ...requiredError, value: true })
                    break;
                case 'isEmail':
                    const reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
                    reg.test(String(value)) ?
                        setEmailError({ ...emailError, value: false }) :
                        setEmailError({ ...emailError, value: true })
                    break;
            }
        }
    }, [value]);

    useEffect(() => {
        if (requiredError.value || emailError.value || minLengthError.value || maxLengthError.value) {
            setIsValid({ value: false })
        } else {
            setIsValid({ value: true })
        }
    }, [requiredError, emailError, minLengthError, maxLengthError]);


    return {
        requiredError,
        emailError,
        minLengthError,
        maxLengthError,
        isValid
    };
}


export default useTextInputValidation;

export type useTextInputValidationReturn = ReturnType<typeof useTextInputValidation>;