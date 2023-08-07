import TextArea from "../common/TextArea";
import { ChangeEvent, Dispatch, FC, FormEvent, SetStateAction } from "react";


interface MessageTextareaProps {
    messageText: string;
    setMessageText: Dispatch<SetStateAction<string>>;
    sendMessage: (event: FormEvent) => void;
}


const MessageTextarea: FC<MessageTextareaProps> = ({
    messageText,
    setMessageText,
    sendMessage
}) => {

    function onMessageChange(event: ChangeEvent<HTMLTextAreaElement>) {
        event.preventDefault();
        setMessageText(event.target.value);
    }


    return (
        <TextArea 
            value={messageText}
            onChange={onMessageChange}
            className="message-textarea"
        />
    );
}


export default MessageTextarea;