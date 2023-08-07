import { useDispatch, useSelector } from 'react-redux';
import SidebarLayout, { SidebarLayoutFooter, SidebarLayoutHeader, SidebarLayoutMain } from '../../layouts/SidebarLayout';
import Avatar from '../common/Avatar';
import IconButton from '../common/IconButton';
import LogoutIcon from '../../assets/icons/logout-icon.svg';
import { AppDispatch, RootState } from '../../store';
import { fetchLogoutThunk } from '../../store/reducers/userReducer';
import { appSidebarItems } from '../../utils/constants';
import AppSidebarItem from './items/AppSidebarItem';
import './index.scss';


const AppSidebar = () => {
    const dispatch = useDispatch<AppDispatch>();
    const currentUser = useSelector((state: RootState) => state.user.currentUser);

    function logoutUser() {
        dispatch(fetchLogoutThunk());
    }

    return (
        <SidebarLayout className='user-sidebar'>
            <SidebarLayoutHeader>
                <Avatar 
                    src={currentUser.avatar ? currentUser.avatar : ''}
                    name={`${currentUser.firstname[0]}${currentUser.lastname[0]}`}
                />
            </SidebarLayoutHeader>

            <SidebarLayoutMain>
                {appSidebarItems.map((item) => (
                    <AppSidebarItem item={item} key={item.id}/>
                ))}
            </SidebarLayoutMain>

            <SidebarLayoutFooter>
                <IconButton 
                    onClick={logoutUser}
                    src={LogoutIcon}
                />
            </SidebarLayoutFooter>
        </SidebarLayout>
    );
}


export default AppSidebar;