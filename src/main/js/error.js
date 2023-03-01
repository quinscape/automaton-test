/*
 * Copyright 2022, QuinScape GmbH. All rights reserved.
 */

import React from "react"
import bootstrap from "jsview-bootstrap"
import LoginForm from "./components/LoginForm";

bootstrap(
    initial => {

        const { contextPath, csrfToken, errorView } = initial;

        const { title, detail, showLogin } = errorView;

        return (
            <div className="container">
                <div className="row">
                    <div className="col">
                        {
                            !showLogin && (
                                <>
                                    <h1>
                                        Automaton-Test Error: { title }
                                    </h1>
                                    <hr/>
                                    <p>
                                        Detail: { detail }
                                    </p>
                                </>
                            )
                        }
                        {
                            showLogin && (
                                <>
                                    <LoginForm
                                        contextPath={ contextPath }
                                        csrfToken={ csrfToken }
                                        errorMessage={ detail }
                                    />
                                </>
                            )
                        }
                    </div>
                </div>
            </div>
        );
    }
)
    .then(
        () => console.log("ready.")
    );

