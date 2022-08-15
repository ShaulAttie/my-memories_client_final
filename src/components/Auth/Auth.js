import './styles.css'
import React, { useState } from 'react';
import { IoPersonOutline } from 'react-icons/io5'
import { Button } from '@mui/material';

import { useNavigate } from "react-router-dom"

import { useDispatch } from 'react-redux';
import { signin, signup } from '../../actions/auth';

import Input from './Input';

// import { AUTH } from '../../constanst/constantsType'
// import { GoogleLogin } from 'react-google-login';
// import Icon from './Icon';


const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' };

const Auth = () => {
    const [isSignup, setIsSignup] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [form, setForm] = useState(initialState);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleShowPassword = () => setShowPassword(!showPassword);

    const switchMode = () => {
        setForm(initialState);
        setIsSignup((prevIsSignup) => !prevIsSignup);
        setShowPassword(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log(form);

        if (isSignup) {
            dispatch(signup(form, navigate));
        } else {
            dispatch(signin(form, navigate));
        }
    };

    //https://dev.to/sivaneshs/add-google-login-to-your-react-apps-in-10-mins-4del
    // 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
    // const googleSuccess = async (res) => {
    //     console.log(res);
    //     const result = res?.profileObj;
    //     const token = res?.tokenId;

    //     try {
    //         dispatch({ type: AUTH, data: { result, token } });
    //         navigate('/');
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };

    // const googleError = (error) => {
    //     console.log(error.details);
    //     alert('Google Sign In was unsuccessful. Try again later');
    // }




    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    return (
        <div className="sign__container">
            <div className="sign__subcontainer">
                <div className="icon__person">
                    <IoPersonOutline />
                </div>
                <div className="sign__title">
                    <h3>{isSignup ? "Log In" : "Sign In"}</h3>
                </div>
                <form onSubmit={handleSubmit}>
                    {isSignup && (
                        <div className='first__last'>
                            <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                            <Input name="lastName" label="Last Name" handleChange={handleChange} half />
                        </div>
                    )}
                    <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
                    <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
                    {isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" />}
                    <Button type="submit" fullWidth variant="contained" color="primary" size="small">
                        {isSignup ? 'Sign Up' : 'Sign In'}
                    </Button>
                    {/* <GoogleLogin
                        clientId="829671554417-7796u42deue9hv9kliag56kvgo4snulm.apps.googleusercontent.com"
                        render={(renderProps) => (
                            <Button color="primary" fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />} variant="contained">
                                Google Sign In
                            </Button>
                        )}
                        onSuccess={googleSuccess}
                        onFailure={googleError}
                        cookiePolicy="single_host_origin"
                    /> */}
                    {/* firm-aria-358105
                    247526779715 */}
                    <div className="already">
                        <div item>
                            <Button onClick={switchMode}>
                                {isSignup ? 'Already have an account? Sign in' : "Don't have an account? Sign Up"}
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )

}

export default Auth;