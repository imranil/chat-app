import { Dispatch, FC, FormEvent, SetStateAction, useState } from "react";
import FormLayout, { FormLayoutFooter, FormLayoutHeader, FormLayoutMain } from "../../../layouts/FormLayout";
import IconButton from "../../common/IconButton";
import Button from "../../common/Button";
import useTextInput from "../../../utils/hooks/useTextInput";
import CrossIcon from "../../../assets/icons/cross.svg";
import "./index.scss";
import TextInput from "../../common/TextInput";
import GroupParticipants from "./GroupParticipants";
import { ArrayNotEmpty } from "../../../utils/helpers";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store";
import { createGroupThunk } from "../../../store/reducers/groupsReducer";
import { useNavigate } from "react-router-dom";


interface CreateGroupFormProps {
    setIsActive: Dispatch<SetStateAction<boolean>>;
};


const CreateGroupForm: FC<CreateGroupFormProps> = ({
    setIsActive,
}) => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const groupName = useTextInput('', { isRequired: true, minLength: 4 });
    const [groupParticipants, setGroupParticipants] = useState<string[]>([]);

    const onSubmit = () => {
        dispatch(createGroupThunk({ name: groupName.value, users: groupParticipants }))
            .unwrap()
            .then(({ data }) => {
                console.log(data);
                navigate(`/chats/groups/${data.id}`);
            })
            .catch((err) => console.log(err));
    };
    
    return (
        <FormLayout 
            className="create-group-form"
            onSubmit={(e: FormEvent) => e.preventDefault()}>
            <FormLayoutHeader>
                <h3>Cerate group</h3>
                <IconButton 
                    className="close-modal-btn"
                    width={24}
                    height={24}
                    src={CrossIcon}
                    onClick={() => setIsActive(false)}
                />
            </FormLayoutHeader>

            <FormLayoutMain>
                <TextInput 
                    {...groupName}
                    label='Name'
                    placeholder='Group name'
                    type='text'
                />
                <GroupParticipants
                    groupParticipants={groupParticipants}
                    setGroupParticipants={setGroupParticipants}
                />
            </FormLayoutMain>

            <FormLayoutFooter>
                <Button 
                    title="Create"
                    isDisabled={!groupName.valid.isValid.value || !ArrayNotEmpty(groupParticipants)}
                    onClick={onSubmit}
                />
            </FormLayoutFooter>
        </FormLayout>
    );
};


export default CreateGroupForm;