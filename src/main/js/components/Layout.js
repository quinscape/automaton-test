import React from "react"

import { AutomatonDevTools, uri, Link, LayoutSlot } from "@quinscape/automaton-js"

import {
    Collapse,
    Container,
    Nav,
    Navbar,
    NavLink,
    NavbarBrand,
    NavbarToggler,
    NavItem
} from "reactstrap"
import CommonNav from "./CommonNav";

class Layout extends React.Component {

    state = {
        isNavExpanded: false
    };

    toggle = () => this.setState({ isNavExpanded : !this.state.isNavExpanded});

    render()
    {
        const { env, children } = this.props;

        const { contextPath } = env.config;

        return (
            <Container fluid={false}>
                <Navbar color="primary" dark expand="md">
                    <NavbarBrand href={ contextPath + "/" }>
                        <i className="fab fa-quinscape mr-1" style={ { fontWeight: "normal"}}/>
                        Automaton-Test
                    </NavbarBrand>
                    <NavbarToggler onClick={this.toggle}/>
                    <Collapse isOpen={this.state.isNavExpanded} navbar>
                        <CommonNav/>
                    </Collapse>
                </Navbar>
                {
                    children
                }
                <AutomatonDevTools/>
            </Container>
        )
    }
}



export default Layout
