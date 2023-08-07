import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { SelectableTheme } from "../../utils/constants";


export interface ThemeState {
    currentTheme: SelectableTheme;
}


const initialState: ThemeState = {
    currentTheme: SelectableTheme.DARK,
}


const themeSlice = createSlice({
    name: 'theme',
    initialState: initialState,
    reducers: {
        setTheme(state, action: PayloadAction<SelectableTheme>) {
            state.currentTheme = action.payload;
            document.documentElement.dataset.theme = state.currentTheme;
            localStorage.setItem('theme', state.currentTheme);
        },
    }
})

export default themeSlice.reducer;
export const { setTheme } = themeSlice.actions;