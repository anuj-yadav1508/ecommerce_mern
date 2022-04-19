import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/actions/authActions';

const Login = () => {
    const dispatch = useDispatch();

    const initialValues = {
        email: '',
        password: '',
        confirmPassword: ''
    };

    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});

    const handleChange = (e) => {
        setFormValues({ ...formValues, [e.target.name]: e.target.value });
    };

    const formValidate = (values) => {
        const errors = {};
        const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        
        if(!values.email) {
            errors.email = "Email field is required!"
        }else if(!emailRegex.test(values.email)) {
            errors.email = 'Enter a valid email'
        }
        if(!values.password) {
            errors.password = 'Password field is required!'
        } else if(values.password.length < 6) {
            errors.password = 'Password must be longer than 6 characters!'
        }
        if(!values.confirmPassword) {
            errors.confirmPassword = 'Confirm Password field is required!'
        }else if(values.password !== values.confirmPassword) {
            errors.confirmPassword = 'Password are not matched!'
        }

        return errors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormErrors(formValidate(formValues));

        try {
            if(Object.keys(formErrors).length === 0) {
                await dispatch(login(formValues.email, formValues.password));
            }
        } catch (err) {
            console.log(err.message);
        }
    };

    return (
       <div className='registerSection'>
            <div className="registerFormContainer">
                <div className="registerHeading">Login</div>
                <div className="registerForm">

                    <div className="group">
                        <label htmlFor="email" className="groupLabel">Email:</label>
                        <input type="text" name='email' value={formValues.email} onChange={handleChange} className="groupInput" />
                        { formErrors.email && <p className='errorText'>{formErrors.email}</p> }
                    </div>

                    <div className="group">
                        <label htmlFor="password" className="groupLabel">Password:</label>
                        <input type="text" name='password' value={formValues.password} onChange={handleChange} className="groupInput" />
                        { formErrors.password && <p className='errorText'>{formErrors.password}</p> }
                    </div>

                    <div className="group">
                        <label htmlFor="confirmPassword" className="groupLabel">Confirm Password:</label>
                        <input type="text" name='confirmPassword' className="groupInput" value={formValues.confirmPassword} onChange={handleChange} />
                        { formErrors.confirmPassword && <p className='errorText'>{formErrors.confirmPassword}</p> }
                    </div>

                    <div className="registerButton" onClick={handleSubmit}>Login</div>

                    <div className="switch"><p className="switchPara">Don't have an account? <span className="switchSpan">Register</span></p></div>
                </div>
            </div>               
        </div>
    )
}

export default Login;