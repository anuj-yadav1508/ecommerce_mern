import React from 'react'
import { Link } from 'react-router-dom';

import './overlayLogin.css';

const OverlayLogin = props => {
    return (
        <div className={props.overlayTrue ? 'overlayLoginSection overlayTrue' : 'overlayLoginSection'}>
            <div className="overlayThings">
                <div className="overlayHeading">
                    Please, Login First, to add Item to carts!
                </div>

                <div className="overlayLogin">
                    <p className="loginHeading">Login, if you have an account?</p>
                    <Link to='/login' className='overlayButton'>Login</Link>
                </div>

                <div className="overlayLogin">
                    <p className="loginHeading">Register, if you don't have an account?</p>
                    <Link to='/register' className='overlayButton'>Register</Link>
                </div>
            </div>
            <button onClick={() => props.setOverlayTrue(false)} className='okayButton'>Okay</button>
        </div>
    )
}

export default OverlayLogin
