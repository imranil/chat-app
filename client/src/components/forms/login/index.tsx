import { FormEvent } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import FormLayout, { FormLayoutFooter, FormLayoutHeader, FormLayoutMain } from "../../../layouts/FormLayout";
import useTextInput from "../../../utils/hooks/useTextInput";
import { Paths } from "../../../utils/constants";
import TextInput from "../../common/TextInput";
import Button from "../../common/Button";
import { AppDispatch } from "../../../store";
import './index.scss';
import { fetchLoginThunk } from "../../../store/reducers/userReducer";
import { socket } from "../../../utils/context/SocketContext";


const LoginForm = () => {
    const dispatch = useDispatch<AppDispatch>();

    const email = useTextInput('', { isRequired: true, isEmail: true });
    const password = useTextInput('', { isRequired: true, minLength: 4 });

    async function handleSubmit(event: FormEvent) {
        event.preventDefault();

        try {
            await dispatch(fetchLoginThunk({
                email: email.value,
                password: password.value
            })).then(() => clearFields());

            socket.connect();
            console.log(socket.connected);
        } catch (err) {
            console.log(socket.connected);
            console.log(err);
        }
    }

    function clearFields() {
        email.setValue('');
        password.setValue('');
    }

    return (
        <FormLayout className="login-form">
            <FormLayoutHeader>
                <h1>Authorization</h1>
            </FormLayoutHeader>
            <FormLayoutMain>
                <TextInput
                    {...email}
                    label='Email'
                    placeholder='Your email'
                    type='email'
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
                    <span>
                        Don't have account?
                    </span>
                    <Link to={Paths.REGISTER}>
                        Create new account.
                    </Link>
                </div>
                <div className="form__btn-area">
                    <Button
                        onClick={handleSubmit}
                        title='Login'
                        isDisabled={!email.valid.isValid.value || !password.valid.isValid.value}
                    />
                </div>
            </FormLayoutFooter>
        </FormLayout>
    );
}

export default LoginForm;