import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Avatar from "../common/Avatar";
import { MessagePanelLayoutHeader } from "../../layouts/MessagePanelLayout";
import { RootState } from "../../store";
import { selectGroupById } from "../../store/reducers/groupsReducer";



const MessagePanelHeader = () => {

    const { id } = useParams();
    const group = useSelector((state: RootState) =>
        selectGroupById(state, parseInt(id!))
    );

    return (
        <MessagePanelLayoutHeader>
            {group &&
                <Avatar
                    src={group.avatar ? group.avatar : ''}
                    name={group.name[0]}
                />
            }
            <span>
                {group?.name}
            </span>
        </MessagePanelLayoutHeader>
    );
}


export default MessagePanelHeader;