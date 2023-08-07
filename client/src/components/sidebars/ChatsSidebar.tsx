import { useSelector } from "react-redux";
import SidebarLayout, { SidebarLayoutHeader, SidebarLayoutItem, SidebarLayoutMain } from "../../layouts/SidebarLayout";
import ChatsSidebarItem from "./items/ChatsSidebarItem";
import { RootState } from "../../store";
import SearchGroupForm from "../forms/SearchGroup";
import Button from "../common/Button";
import { useState } from "react";
import CreateGroupModal from "../modals/CreateGroup";


const ChatsSidebar = () => {

    const groups = useSelector((state: RootState) => state.groups.groups);
    const [isActive, setIsActive] = useState(false);

    return (
        <SidebarLayout className='chat-sidebar'>
            <SidebarLayoutHeader>
                <SearchGroupForm />
            </SidebarLayoutHeader>

            <SidebarLayoutMain>

                <SidebarLayoutItem
                    className="create-group-btn"
                >
                    <Button onClick={() => setIsActive(true)} title="Create group" />
                    <CreateGroupModal 
                        isActive={isActive}
                        setIsActive={setIsActive}
                    />
                </SidebarLayoutItem>
                
                {groups.map((group) => (
                    <ChatsSidebarItem
                        key={group.id}
                        chat={group}
                    />
                ))}
            </SidebarLayoutMain>
        </SidebarLayout>
    );
}


export default ChatsSidebar;