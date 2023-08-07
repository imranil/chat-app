import { FC } from "react";
import GroupRecipientsSidebarItem from "../items/GroupRecipientsSidebarItem";
import { Group, User } from "../../../utils/types";


interface OfflineGroupRecipientsProps {
    onlineUsers: User[];
    group?: Group;
}


const OfflineGroupRecipients: FC<OfflineGroupRecipientsProps> = ({
    onlineUsers,
    group
}) => {
    return (
        <>
            {group?.users
                .filter(
                    (user) => !onlineUsers.find((onlineUser) => onlineUser.id === user.id)
                )
                .map((user) =>
                    <GroupRecipientsSidebarItem
                        user={user}
                    />
            )}
        </>
    );
}


export default OfflineGroupRecipients;