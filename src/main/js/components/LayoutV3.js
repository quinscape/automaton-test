import React, { useReducer } from "react"

import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler } from "reactstrap"
import CommonNav from "./CommonNav";


const LayoutV3 = props => {

    const [isNavExpanded, toggle] = useReducer(isNavExpanded => !isNavExpanded, false);

    const { env, children } = props;

    const { contextPath } = env.config;

    return (
        <Container fluid={ true }>
            <Navbar color="dark" dark>
                <NavbarBrand href={ contextPath + "/" }>Layout v3</NavbarBrand>
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

export default LayoutV3
