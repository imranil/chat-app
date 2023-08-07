import { FC } from "react";
import useTextInput from "../../../../utils/hooks/useTextInput";
import TextInput from "../../../common/TextInput";
import Button from "../../../common/Button";
import { GroupParticipantsProps } from ".";


const GroupParticipantsField: FC<GroupParticipantsProps> = ({
    groupParticipants,
    setGroupParticipants,
}) => {

    const groupParticipant = useTextInput('', { isRequired: false, isEmail: true });


    const addGroupParticipant = () => {
        if (groupParticipant.valid.isValid.value) {
            setGroupParticipants(groupParticipants.concat(groupParticipant.value));
            groupParticipant.setValue('');
        }
    };

    return (
        <div className="group-participants-field">
                <TextInput
                    {...groupParticipant}
                    label='Participants'
                    placeholder='Participant email'
                    type='email'
                    hideErrors={true}
                />
                <Button
                    onClick={addGroupParticipant}
                    title="Add"
                    className='add-group-participant-btn'
                />
        </div>
    );
};


export default GroupParticipantsField;