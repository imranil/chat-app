import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { RootState } from "../store";
import { setTheme } from "../store/reducers/themeReducer";
import { Paths, SelectableTheme } from "../utils/constants";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
import AppPage from "./AppPage";
import ChatsPage from "./chats/ChatsPage";
import GroupPage from "./chats/GroupPage";



const Router = () => {
    const isAuth = useSelector((state: RootState) => state.user.isAuth);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setTheme(SelectableTheme.DARK));
    });

    return (
        <BrowserRouter>
            {isAuth
                ?
                <Routes>
                    <Route path={Paths.APP} element={<AppPage />}>
                        <Route path={Paths.CHATS} element={<ChatsPage />}>
                            <Route 
                                path=":id"
                                element={<GroupPage />}
                            />
                        </Route>
                    </Route>
                    <Route path='*' element={<AppPage />} />
                </Routes>
                :
                <Routes>
                    <Route path={Paths.LOGIN} element={<LoginPage />} />
                    <Route path={Paths.REGISTER} element={<RegisterPage />} />
                    <Route path='*' element={<Navigate to={Paths.LOGIN} />} />
                </Routes>
            }
        </BrowserRouter>
    );
}


export default Router;