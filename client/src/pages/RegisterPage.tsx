import PageLayout from '../layouts/PageLayout';
import Container from '../components/common/Container';
import RegisterForm from '../components/forms/register';


const RegisterPage = () => {
    return (
        <PageLayout
            className='register-page'
            display='flex'
            justifyContent='center'
            alignItems='center'
        >
            <Container>
                <RegisterForm />
            </Container>
        </PageLayout>
    );
}

export default RegisterPage;