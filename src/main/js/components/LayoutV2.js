import React, { useReducer } from "react"

import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler } from "reactstrap"
import CommonNav from "./CommonNav";

const LayoutV2 = props => {

    const [isNavExpanded, toggle] = useReducer(isNavExpanded => !isNavExpanded, false);

    const { env, children } = props;

    const { contextPath } = env.config;

    return (
        <Container fluid={ false }>
            <Navbar color="light" light expand="md">
                <NavbarBrand href={ contextPath + "/" }>
                    Layout v2
                </NavbarBrand>
                <NavbarToggler onClick={ toggle }/>
                <Collapse isOpen={ isNavExpanded } navbar>
                    <CommonNav/>
                </Collapse>
            </Navbar>
            {
                children
            }
        </Container>
    )
}

export default LayoutV2
