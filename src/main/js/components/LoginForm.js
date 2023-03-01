import React from "react";
import { Icon }from "domainql-form"
/**
 * Reusable login view component. Gets used in login.js and in some error cases in error.js
 */
const LoginForm =({contextPath, csrfToken, errorMessage}) => {
    return (
        <React.Fragment>
            <h1>
                <Icon className="fa-flask mr-1 text-success mt-3"/>

                Automaton-Test Login</h1>
            <hr/>
            {

                errorMessage && (
                    <React.Fragment>
                        <p className="text-danger">{ errorMessage }</p>
                        <hr/>
                    </React.Fragment>
                )
            }

            <form method="POST" action={contextPath + "/login_check"}>
                <div className="form-group">
                    <label htmlFor="loginField">Login</label>
                    <input type="text" className="form-control" name="username" id="loginField"
                           placeholder="Login Name"/>
                </div>
                <div className="form-group">
                    <label htmlFor="passwordField">Password</label>
                    <input type="password" className="form-control" id="passwordField"
                           placeholder="Password" name="password"/>
                </div>
                <div className="form-check">
                    <input type="checkbox" className="form-check-input" id="rememberMeCheckbox"
                           name="remember-me"/>
                    <label className="form-check-label" htmlFor="rememberMeCheckbox">Remember the login on
                        this computer</label>
                </div>

                <input type="hidden" name={csrfToken.param} value={csrfToken.value}/>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </React.Fragment>
    )
}

export default LoginForm
