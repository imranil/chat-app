import { FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import FormLayout, { FormLayoutFooter, FormLayoutHeader, FormLayoutMain } from "../../../layouts/FormLayout";
import { AppDispatch } from "../../../store";
import { postRegisterUser } from "../../../utils/api";
import useTextInput from "../../../utils/hooks/useTextInput";
import TextInput from "../../common/TextInput";
import Button from "../../common/Button";
import { Paths } from "../../../utils/constants";
import './index.scss';


const RegisterForm = () => {

    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const email = useTextInput('', { isRequired: true, isEmail: true });
    const firstname = useTextInput('', { isRequired: true });
    const lastname = useTextInput('', { isRequired: true });
    const password = useTextInput('', { isRequired: true, minLength: 4 });

    function handleSubmit(event: FormEvent) {
        event.preventDefault();

        postRegisterUser({
            email: email.value,
            firstname: firstname.value,
            lastname: lastname.value,
            password: password.value
        }).then(() => {
            navigate(Paths.LOGIN);
        });
    }

    return (
        <FormLayout className="register-form">
            <FormLayoutHeader>
                <h1>Registration</h1>
            </FormLayoutHeader>
            <FormLayoutMain>
                <TextInput
                    {...email}
                    label='Email'
                    placeholder='Your email'
                    type='email'
                />
                <TextInput
                    {...firstname}
                    label='First Name'
                    placeholder='Your first name'
                />
                <TextInput
                    {...lastname}
                    label='Last Name'
                    placeholder='Your last name'
                />
                <TextInput
                    {...password}
                    label='Password'
                    placeholder='Your password'
                    type='password'
                />
            </FormLayoutMain>
            <FormLayoutFooter>
                <div className="form__link-area">
                    <span>Have an account?</span>
                    <Link to={Paths.LOGIN}>
                        Login.
                    </Link>
                </div>
                <div className="form__btn-area">
                    <Button
                        onClick={handleSubmit}
                        title='Continue'
                        isDisabled={
                            !email.valid.isValid.value ||
                            !firstname.valid.isValid.value ||
                            !lastname.valid.isValid.value ||
                            !password.valid.isValid.value
                        }
                    />
                </div>
            </FormLayoutFooter>
        </FormLayout>
    );
}

export default RegisterForm;