import { useContext, useEffect, useState } from "react";
import SidebarLayout, { SidebarLayoutHeader, SidebarLayoutItem, SidebarLayoutMain } from "../../../layouts/SidebarLayout";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import '../index.scss';
import OnlineGroupRecipients from "./OnlineGroupRecipients";
import { SocketContext } from "../../../utils/context/SocketContext";
import { User } from "../../../utils/types";
import { RootState } from "../../../store";
import { selectGroupById } from "../../../store/reducers/groupsReducer";
import OfflineGroupRecipients from "./OfflineGroupRecipients";


const GroupRecipientsSidebar = () => {
    const { id: groupId } = useParams();
    const [onlineUsers, setOnlineUsers] = useState<User[]>([]);
    const socket = useContext(SocketContext);
    const group = useSelector((state: RootState) => 
        selectGroupById(state, parseInt(groupId!))
    );

    useEffect(() => {
        socket.connect();
        socket.emit('getGroupUsers', { groupId });

        socket.on('groupUsersReceived', (payload) => {
            console.log('received groupUsersReceived event');
            setOnlineUsers(payload.onlineUsers);
        });

        return () => {
            socket.off('GroupUsersReceived');
        };
    }, [group, groupId]);

    return (
        <SidebarLayout className="room-recipients-sidebar">
            <SidebarLayoutHeader>
                <span>Participants</span>
            </SidebarLayoutHeader>

            <SidebarLayoutMain>
                <SidebarLayoutItem>
                    Online
                </SidebarLayoutItem>
                <OnlineGroupRecipients 
                    users={onlineUsers}
                />
                <SidebarLayoutItem>
                    Offline
                </SidebarLayoutItem>
                <OfflineGroupRecipients 
                    onlineUsers={onlineUsers}
                    group={group}
                />
            </SidebarLayoutMain>
        </SidebarLayout>
    );
}


export default GroupRecipientsSidebar;