import { PayloadAction, createAsyncThunk, createSelector, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../index";
import { CreateGroupParams, Group } from "../../utils/types";
import { createGroup, getGroups } from "../../utils/api";


export interface GroupState {
    groups: Group[];
}


const initialState: GroupState = {
    groups: [],
}


export const fetchGroupsThunk = createAsyncThunk(
    'groups/fetch', 
    (search: string = '') => getGroups(search),
);

export const createGroupThunk = createAsyncThunk(
    'groups/create',
    (params: CreateGroupParams) => createGroup(params)
);


const groupsSlice = createSlice({
    name: 'groups',
    initialState: initialState,
    reducers: {
        addGroup(state, action: PayloadAction<Group>) {
            state.groups.unshift(action.payload);
        },
        removeGroup(state, action: PayloadAction<Group>) {
            state.groups = state.groups.filter((group) => group.id !== action.payload.id);
        },
        updateGroup(state, action: PayloadAction<Group>) {
            const group = action.payload;
            const existingGroup = state.groups.find((group) => group.id === action.payload.id);
            const index = state.groups.findIndex((group) => group.id === action.payload.id);
            if(!existingGroup ) return;
            state.groups.splice(index, 1);
            state.groups.unshift(group);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchGroupsThunk.fulfilled, (state, action) => {
                state.groups = action.payload.data;
            })
    }
})


const selectGroups = (state: RootState) => state.groups.groups;
const selectGroupId = (state: RootState, id: number) => id;

export const selectGroupById = createSelector(
    [selectGroups, selectGroupId],
    (groups, groupId) => groups.find((group) => group.id === groupId)
);


export default groupsSlice.reducer;
export const { addGroup, removeGroup, updateGroup } = groupsSlice.actions;
