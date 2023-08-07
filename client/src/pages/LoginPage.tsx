import PageLayout from '../layouts/PageLayout';
import Container from '../components/common/Container';
import LoginForm from '../components/forms/login';

const LoginPage = () => {

    return (
        <PageLayout
            display='flex'
            justifyContent='center'
            alignItems='center'
        >
            <Container>
                <LoginForm />
            </Container>
        </PageLayout>
    );
}

export default LoginPage;