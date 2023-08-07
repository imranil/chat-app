import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./reducers/themeReducer";
import userReducer from "./reducers/userReducer";
import groupsReducer from "./reducers/groupsReducer";
import groupMessagesReducer from "./reducers/groupMessageReducer";


const store = configureStore({
    reducer: {
        theme: themeReducer,
        user: userReducer,
        groups: groupsReducer,
        groupMessages: groupMessagesReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
    devTools: true,
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;