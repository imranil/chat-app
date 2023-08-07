import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { RootState } from "../../store";
import { selectGroupMessage } from "../../store/reducers/groupMessageReducer";
import MessageItem from "./MessageItem";



const MessageContainer = () => {
    const { id } = useParams();

    const groupMessages = useSelector((state: RootState) => 
        selectGroupMessage(state, parseInt(id!))
    );


    return (
        <>
            {groupMessages?.messages.map((message) => 
                <MessageItem message={message} key={message.id}/>
            )}
        </>
    );
}


export default MessageContainer;