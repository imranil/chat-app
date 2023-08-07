import { ChangeEvent, useState, FocusEvent } from "react";
import useTextInputValidation, { ITextInputValidations } from "./useTextInputValidation";



const useTextInput = (initialValue: string, validations: ITextInputValidations) => {
    const [value, setValue] = useState<string>(initialValue);
    const [isDirty, setIsDirty] = useState<boolean>(false);
    const valid = useTextInputValidation(value, validations);

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        setValue(event.currentTarget.value);
    }

    const onBlur = (event: FocusEvent<HTMLInputElement>) => {
        setIsDirty(true);
    }

    return {
        value,
        setValue,
        onChange,
        onBlur,
        isDirty,
        setIsDirty,
        valid
    }
}


export default useTextInput;

export type useTextInputReturn = ReturnType<typeof useTextInput>;