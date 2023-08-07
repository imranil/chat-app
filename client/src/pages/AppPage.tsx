import { Outlet } from 'react-router';
import PageLayout from '../layouts/PageLayout';
import AppSidebar from '../components/sidebars/AppSidebar';


const AppPage = () => {
    return (
        <PageLayout
            className='app-page'
            display='flex'
            justifyContent='flex-start'
            alignItems='flex-start'
        >
            <AppSidebar />
            <Outlet />
        </PageLayout>
    );
}


export default AppPage;