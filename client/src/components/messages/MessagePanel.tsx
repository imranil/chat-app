import MessagePanelLayout, { MessagePanelLayoutMain, MessagePanelLayoutFooter } from "../../layouts/MessagePanelLayout";
import MessagePanelHeader from "./MessagePanelHeader";
import MessageInputField from "./MessageInputField";
import MessageContainer from "./MessageContainer";
import { FormEvent, useState } from "react";
import { useParams } from "react-router";
import { createGroupMessage } from "../../utils/api";


const MessagePanel = () => {

    const [messageText, setMessageText] = useState('');
    const { id: routeId } = useParams();

    const sendMessage = async (event: FormEvent) => {
        event.preventDefault();
        const trimmedMessageText = messageText.trim();

        if(!routeId) return;
        if(!trimmedMessageText) return;

        try {
            await createGroupMessage(routeId, {
                text: trimmedMessageText
            });
            setMessageText('');
        } catch(err) {
            alert(err);
        }
    };

    return (
        <MessagePanelLayout>
            <MessagePanelHeader />

            <MessagePanelLayoutMain>
                <MessageContainer />
            </MessagePanelLayoutMain>

            <MessagePanelLayoutFooter>
                <MessageInputField 
                    messageText={messageText}
                    setMessageText={setMessageText}
                    sendMessage={sendMessage}
                />
            </MessagePanelLayoutFooter>
        </MessagePanelLayout>
    );
}


export default MessagePanel;