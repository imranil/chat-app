import { PayloadAction, createAsyncThunk, createSelector, createSlice } from "@reduxjs/toolkit";
import { GroupMessageEventPayload, GroupMessagesType } from "../../utils/types";
import { RootState } from "..";
import { getGroupMessages } from "../../utils/api";



export interface GroupMessageState {
    messages: GroupMessagesType[];
}


const initialState: GroupMessageState = {
    messages: [],
}


export const fetchGroupMessagesThunk = createAsyncThunk(
    'groupMessages/fetch',
    (id: number) => getGroupMessages(id)
);


const groupMessagesSlice = createSlice({
    name: 'groupMessages',
    initialState,
    reducers: {
        addGroupMessage: (state, action: PayloadAction<GroupMessageEventPayload>) => {
            const { group, message } = action.payload;
            const groupMessage = state.messages.find((gm) => gm.id === group.id);
            groupMessage?.messages.unshift(message);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchGroupMessagesThunk.fulfilled, (state, action) => {
                const { id } = action.payload.data;
                const index = state.messages.findIndex((groupMessage) => groupMessage.id === id);
                const exists = state.messages.find((groupMessage) => groupMessage.id === id);

                if (exists) {
                    state.messages[index] = action.payload.data;
                } else {
                    state.messages.push(action.payload.data);
                }
            })
    }
});


const selectGroupMessages = (state: RootState) => state.groupMessages.messages;
const selectGroupMessageId = (state: RootState, id: number) => id;

export const selectGroupMessage = createSelector(
    [selectGroupMessages, selectGroupMessageId],
    (groupMessages, id) => groupMessages.find((groupMessage) => groupMessage.id === id)
);


export default groupMessagesSlice.reducer;
export const { addGroupMessage } = groupMessagesSlice.actions;
