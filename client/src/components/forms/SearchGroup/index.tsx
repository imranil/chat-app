import { ChangeEvent, useState } from "react";
import { useDispatch } from "react-redux";
import FormLayout from "../../../layouts/FormLayout"
import TextInput from "../../common/TextInput";
import { AppDispatch } from "../../../store";
import { fetchGroupsThunk } from "../../../store/reducers/groupsReducer";
import './index.scss';


const SearchGroupForm = () => {
    const dispatch = useDispatch<AppDispatch>();

    const [search, setSearch] = useState<string>('');
    
    const SearchChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.currentTarget.value;
        setSearch(value);
        dispatch(fetchGroupsThunk(value));
    };

    return (
        <FormLayout className="search-form">
            <TextInput
                value={search}
                onChange={SearchChangeHandler}
                className="search-input"
                type="search"
                placeholder="Search..."
            />
        </FormLayout>
    );
}


export default SearchGroupForm;