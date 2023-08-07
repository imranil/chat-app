import { Dispatch, FC, FormEvent, SetStateAction } from "react";
import FormLayout from "../../layouts/FormLayout";
import MessageTextarea from "./MessageTextarea";
import IconButton from "../common/IconButton";
import SendIcon from '../../assets/icons/send-icon.svg';
import './index.scss';


interface MessageInputFieldProps {
    messageText: string;
    setMessageText: Dispatch<SetStateAction<string>>
    sendMessage: (event: FormEvent) => void;
}


const MessageInputField: FC<MessageInputFieldProps> = ({
    messageText,
    setMessageText,
    sendMessage
}) => {
    return (
        <FormLayout 
            onSubmit={(event: FormEvent) => event.preventDefault()}
            className="message-input-form"
        >
            <MessageTextarea 
                messageText={messageText}
                setMessageText={setMessageText}
                sendMessage={sendMessage}
            />
            <IconButton 
                onClick={sendMessage}
                src={SendIcon}
                className="message-input-form__button"
            />
        </FormLayout>
    );
}


export default MessageInputField;