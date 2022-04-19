import React, { useState } from 'react';
import './register.css';

const Register = () => {
    const initialValues = {
        name: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    };

    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});

    const handleChange = (e) => {
        setFormValues({...formValues, [e.target.name]: e.target.value });
        
    };

    const formValidate = (values) => {
        const errors = {};
        const emailRegex =  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if(!values.name) {
            errors.name = 'Name field is required!'
        }
        if(!values.username) {
            errors.username = 'Username field is required!'
        }
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

    const submitHandler = (e) => {
        e.preventDefault();
        setFormErrors(formValidate(formValues));
    };

    return (
        <div className='registerSection'>
            <div className="registerFormContainer">
                <div className="registerHeading">Register</div>
                <div className="registerForm">
                    <div className="group">
                        <label htmlFor="name" className="groupLabel">Name:</label>
                        <input type="text" className="groupInput" name='name' value={formValues.name} onChange={handleChange} />
                        { formErrors.name && <p className='errorText'>{formErrors.name}</p>}
                    </div>

                    <div className="group">
                        <label htmlFor="username" className="groupLabel">Username:</label>
                        <input name='username' type="text" value={formValues.username} onChange={handleChange} className="groupInput" />
                        { formErrors.username && <p className='errorText'>{formErrors.username}</p>}
                    </div>

                    <div className="group">
                        <label htmlFor="email" className="groupLabel">Email:</label>
                        <input type="text" name='email' value={formValues.email} onChange={handleChange} className="groupInput" />
                        { formErrors.email && <p className='errorText'>{formErrors.email}</p>}
                    </div>

                    <div className="group">
                        <label htmlFor="password" className="groupLabel">Password:</label>
                        <input type="text" name='password' value={formValues.password} onChange={handleChange} className="groupInput" />
                        { formErrors.password && <p className='errorText'>{formErrors.password}</p>}
                    </div>

                    <div className="group">
                        <label htmlFor="confirmPassword" className="groupLabel">Confirm Password:</label>
                        <input type="text" name='confirmPassword' value={formValues.confirmPassword} onChange={handleChange} className="groupInput" />
                        { formErrors.confirmPassword && <p className='errorText'>{formErrors.confirmPassword}</p>}
                    </div>

                    <div className="registerButton" onClick={submitHandler}>Register</div>

                    <div className="switch"><p className="switchPara">Already have an account? <span className="switchSpan">Login</span></p></div>
                </div>
            </div>               
        </div>
    )
}

export default Register;