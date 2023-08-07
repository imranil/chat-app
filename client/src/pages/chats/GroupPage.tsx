import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import { useContext, useEffect } from "react";
import { addGroupMessage, fetchGroupMessagesThunk } from "../../store/reducers/groupMessageReducer";
import MessagePanel from "../../components/messages/MessagePanel";
import GroupRecipientsSidebar from "../../components/sidebars/group-recipients/GroupRecipientsSidebar";
import { SocketContext } from "../../utils/context/SocketContext";
import { GroupMessageEventPayload } from "../../utils/types";
import { updateGroup } from "../../store/reducers/groupsReducer";



const GroupPage = () => {
    const { id } = useParams();
    const dispatch = useDispatch<AppDispatch>();
    const socket = useContext(SocketContext);

    useEffect(() => {
        const groupId = parseInt(id!);
        dispatch(fetchGroupMessagesThunk(groupId));
    }, [id]);

    useEffect(() => {
        const groupId = id!;
        socket.emit('onGroupJoin', { groupId });

        return () => {
            socket.emit('onGroupLeave', { groupId });
        };
    }, [id]);

    return (
        <>
            <MessagePanel />
            <GroupRecipientsSidebar />
        </>
    );
}


export default GroupPage;