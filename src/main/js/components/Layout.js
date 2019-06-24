import React, { useReducer } from "react"

import { AutomatonDevTools, LogoutForm } from "@quinscape/automaton-js"

import {
    Collapse,
    Container,
    Navbar,
    NavbarBrand,
    NavbarToggler
} from "reactstrap"

import CommonNav from "./CommonNav";

const Layout = props => {

    const [ isNavExpanded, toggle ] = useReducer(isNavExpanded => !isNavExpanded, false);

    const { env, children } = props;

    const { contextPath } = env.config;

    return (
        <Container
            fluid={ false }
        >
            <Navbar
                id="app-navbar"
                color="primary"
                dark
                expand="md"
                sticky="top"
            >
                <NavbarBrand
                    href={contextPath + "/"}
                >
                    <i className="brand-icon fab fa-quinscape mr-1"/>
                    Automaton-Test
                </NavbarBrand>
                <NavbarToggler
                    onClick={ toggle }
                />
                <Collapse
                    isOpen={ isNavExpanded }
                    navbar
                >
                    <CommonNav/>
                </Collapse>
            </Navbar>
            {
                children
            }
            <div className="footer">
                <LogoutForm/>
            </div>
            <AutomatonDevTools/>
        </Container>
    );
};

export default Layout
