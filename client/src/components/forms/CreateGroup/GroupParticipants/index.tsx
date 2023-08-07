import { Dispatch, FC, SetStateAction } from "react";
import GroupParticipantsField from "./GroupParticipantsField";
import GroupParticipantsPills from "./GroupParticipantsPills";


export interface GroupParticipantsProps {
    groupParticipants: string[];
    setGroupParticipants: Dispatch<SetStateAction<string[]>>;
};


const GroupParticipants: FC<GroupParticipantsProps> = ({
    groupParticipants,
    setGroupParticipants,
}) => {
    return (
        <>
            <GroupParticipantsField 
                groupParticipants={groupParticipants}
                setGroupParticipants={setGroupParticipants}
            />
            <GroupParticipantsPills 
                groupParticipants={groupParticipants}
                setGroupParticipants={setGroupParticipants}
            />
        </>
    );
};


export default GroupParticipants;