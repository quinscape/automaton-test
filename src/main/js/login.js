/*
 * Copyright 2022, QuinScape GmbH. All rights reserved.
 */

import React from "react"
import bootstrap from "jsview-bootstrap"
import LoginForm from "./components/LoginForm";


bootstrap(
    initial => {

        const {contextPath, csrfToken, loginException} = initial;

        return (
            <div className="container">
                <div className="row">
                    <div className="col">
                        <LoginForm
                            contextPath={ contextPath }
                            csrfToken={ csrfToken }
                            errorMessage={ loginException }
                        />
                    </div>
                </div>
            </div>
        );
    }
)
    .then(
        () => console.log("ready.")
    );

