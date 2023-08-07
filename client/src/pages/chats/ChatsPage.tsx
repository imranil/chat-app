import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import { useContext, useEffect } from "react";
import { addGroup, fetchGroupsThunk, updateGroup } from "../../store/reducers/groupsReducer";
import PageLayout from "../../layouts/PageLayout";
import ChatsSidebar from "../../components/sidebars/ChatsSidebar";
import { Outlet, useParams } from "react-router-dom";
import { SocketContext } from "../../utils/context/SocketContext";
import { Group, GroupMessageEventPayload } from "../../utils/types";
import { addGroupMessage } from "../../store/reducers/groupMessageReducer";


const ChatsPage = () => {
    const { id } = useParams();
    const dispatch = useDispatch<AppDispatch>();
    const socket = useContext(SocketContext);

    useEffect(() => {
        dispatch(fetchGroupsThunk(''));
    }, []);

    useEffect(() => {
        socket.on('onGroupCreate', (payload: Group) => {
            console.log('Group Created')
            dispatch(addGroup(payload));
        });

        socket.on('onGroupMessage', (payload: GroupMessageEventPayload) => {
            console.log('Group Message Received');
            const { group } = payload;
            dispatch(addGroupMessage(payload));
            dispatch(updateGroup(group));
        });

        return () => {
            socket.off('onGroupCreate');
            socket.off('onGroupMessage');
        };
    }, [id]);

    return (
        <PageLayout
            className="chat-page"
            display="flex"
            justifyContent="flex-start"
            alignItems="flex-start"
        >
            <ChatsSidebar />
            <Outlet />
        </PageLayout>
    );
}


export default ChatsPage;