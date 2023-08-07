import { FC } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AppSidebarItemType } from "../../../utils/types";
import { getUserSidebarIcon } from "../../../utils/helpers";
import { SidebarLayoutItem } from "../../../layouts/SidebarLayout";
import IconButton from "../../common/IconButton";



interface AppSidebarItemProps {
    item: AppSidebarItemType;
}


const AppSidebarItem: FC<AppSidebarItemProps> = ({ item }) => {
    const navigate = useNavigate();
    const { pathname } = useLocation()
    const Icon = getUserSidebarIcon(item.id);


    function isActive(): boolean {
        return pathname.includes(item.path);
    }

    return (
        <SidebarLayoutItem
            className={["user-sidebar__item", isActive() && "active"].join(' ')}
        >
            <IconButton
                src={Icon}
                onClick={() => navigate(item.path)}
            />
        </SidebarLayoutItem>
    );
}


export default AppSidebarItem;