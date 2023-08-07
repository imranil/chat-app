import { FC } from "react";
import IconButton from "../../../common/IconButton";
import CrossIcon from "../../../../assets/icons/cross.svg";
import { GroupParticipantsProps } from ".";


const GroupParticipantsPills: FC<GroupParticipantsProps> = ({
    groupParticipants,
    setGroupParticipants,
}) => {

    const removeGroupParticipant = (email: string) => {
        setGroupParticipants(groupParticipants.filter(
            (groupParticipant) => groupParticipant !== email
        ));
    };

    return (
        <div className="group-participants-pills">
            {groupParticipants.map((groupParticipant) => (
                <div key={groupParticipant} className="group-participants-pill">
                    <div className="email">
                        {groupParticipant}
                    </div>
                    <IconButton
                        src={CrossIcon}
                        onClick={() => removeGroupParticipant(groupParticipant)}
                        width={14}
                        height={14}
                    />
                </div>
            ))}
        </div>
    );
};


export default GroupParticipantsPills;