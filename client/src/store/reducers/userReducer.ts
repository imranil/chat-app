import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CreateUserParams, CredentialsUserParams, User } from '../../utils/types';
import { postLoginUser, postLogoutUser, postRegisterUser } from "../../utils/api";
import { NotAuthUser } from "../../utils/constants";


export interface UserState {
    currentUser: User;
    isAuth: boolean
}


const initialState: UserState = {
    currentUser: NotAuthUser,
    isAuth: false,
}

export const fetchLoginThunk = createAsyncThunk(
    'auth/login/fetch',
    (user: CredentialsUserParams) => postLoginUser(user)
)

export const fetchLogoutThunk = createAsyncThunk(
    'auth/logout/fetch',
    () => postLogoutUser()
)


const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchLoginThunk.fulfilled, (state, action) => {
                if (action.payload.data) {
                    state.isAuth = true;
                    state.currentUser = action.payload.data;
                }
            })
            .addCase(fetchLogoutThunk.fulfilled, (state, action) => {
                state.isAuth = false;
                state.currentUser = NotAuthUser;
            })
            .addCase(fetchLoginThunk.rejected, (state, action) => {
                alert(action.error.message);
            })
            .addCase(fetchLogoutThunk.rejected, (state, action) => {
                alert(action.error.message);
            })
    }
})

export default userSlice.reducer;
//export const {  } = userSlice.actions;