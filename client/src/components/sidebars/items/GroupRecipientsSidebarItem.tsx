import { FC } from "react";
import { User } from "../../../utils/types";
import { SidebarLayoutItem } from "../../../layouts/SidebarLayout";
import Avatar from "../../common/Avatar";



interface GroupRecipientsSidebarItemProps {
    user: User;
}


const GroupRecipientsSidebarItem: FC<GroupRecipientsSidebarItemProps> = ({ user }) => {


    return (
        <SidebarLayoutItem
            className={["room-recipients-sidebar__item"].join(' ')}
        >
            <Avatar
                src={user.avatar ? user.avatar : ''}
                name={`${user.firstname[0]}${user.lastname[0]}`}
            />
            <div className="recipientsDetails">
                <span>{user.firstname} {user.lastname}</span>
            </div>
        </SidebarLayoutItem>
    );
}


export default GroupRecipientsSidebarItem;