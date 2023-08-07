import { FC } from "react";
import GroupRecipientsSidebarItem from "../items/GroupRecipientsSidebarItem";
import { User } from "../../../utils/types";


interface OnlineGroupRecipientsProps {
    users: User[];
}


const OnlineGroupRecipients: FC<OnlineGroupRecipientsProps> = ({ users }) => {
    return (
        <>
            {users.map((user) => (
                <GroupRecipientsSidebarItem user={user} key={user.id}/>
            ))}
        </>
    );
}


export default OnlineGroupRecipients;