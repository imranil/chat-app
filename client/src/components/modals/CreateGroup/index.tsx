import { Dispatch, FC, SetStateAction } from "react";
import ModalWindowLayout from "../../../layouts/ModalWindowLayout";
import CreateGroupForm from "../../forms/CreateGroup";
import "./index.scss";


interface CreateGroupModalProps {
    isActive: boolean;
    setIsActive: Dispatch<SetStateAction<boolean>>;
}


const CreateGroupModal: FC<CreateGroupModalProps> = ({
    isActive,
    setIsActive
}) => {
    return (
        <ModalWindowLayout
            isActive={isActive}
            setIsActive={setIsActive}
            className="create-group-modal"
        >
            <CreateGroupForm 
                setIsActive={setIsActive}
            />
        </ModalWindowLayout>
    );
};


export default CreateGroupModal;