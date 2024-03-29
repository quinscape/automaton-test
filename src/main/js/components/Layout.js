import React, { useReducer } from "react"

import { LogoutForm, StyleSwitcher } from "@quinscape/automaton-js"

import {
    Collapse,
    Container,
    Navbar,
    NavbarBrand,
    NavbarToggler
} from "reactstrap"

import CommonNav from "./CommonNav";
import { ToastContainer } from "react-toastify";

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
            <hr/>
            <div className="footer">
                <StyleSwitcher/>
                <LogoutForm/>
            </div>
            <ToastContainer/>
        </Container>
    );
};

export default Layout
