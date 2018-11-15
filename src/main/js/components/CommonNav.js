import React from "react"
import Nav from "reactstrap/lib/Nav";
import NavItem from "reactstrap/lib/NavItem";
import Dropdown from "reactstrap/lib/Dropdown";
import DropdownToggle from "reactstrap/lib/DropdownToggle";
import DropdownMenu from "reactstrap/lib/DropdownMenu";
import DropdownItem from "reactstrap/lib/DropdownItem";

import { uri, Link, runProcessURI } from "automaton-js"


class CommonNav extends React.Component {

    state = {
        dropdownOpen: false
    };

    toggle = () => this.setState({dropdownOpen: !this.state.dropdownOpen});


    render()
    {
        return (
            <Nav className="ml-auto" navbar>
                <NavItem>
                    <Link className="nav-link" href={uri("/shipping/order/")}>Orders</Link>
                </NavItem>
                <Link className="nav-link" href={uri("/shipping/products/")}>Products</Link>
                <NavItem>
                    <Link className="nav-link" href={uri("/shipping/customer/")}>Customers</Link>
                </NavItem>

                <Dropdown nav isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                    <DropdownToggle nav caret>
                        Tests
                    </DropdownToggle>
                    <DropdownMenu>
                        <DropdownItem
                            onClick={() => runProcessURI("/shipping/crud-test")}
                        >
                            CRUD-Test
                        </DropdownItem>
                        <DropdownItem
                            onClick={() => runProcessURI("/shipping/process-test")}
                        >
                            Process-Test
                        </DropdownItem>
                        <DropdownItem divider/>
                        <DropdownItem
                            onClick={() => runProcessURI("/shipping/multi-layout")}
                        >
                            Multi-Layout
                        </DropdownItem>
                        <DropdownItem
                            onClick={() => runProcessURI("/shipping/multi-layout?useDefault=1")}
                        >
                            Multi-Layout(with Default)
                        </DropdownItem>
                        <DropdownItem divider/>
                        <DropdownItem
                            onClick={() => runProcessURI("/shipping/decision-start?target=a")}
                        >
                            Decision Start A
                        </DropdownItem>
                        <DropdownItem
                            onClick={() => runProcessURI("/shipping/decision-start?target=b")}
                        >
                            Decision Start B
                        </DropdownItem>
                        <DropdownItem
                            onClick={() => runProcessURI("/shipping/decision-start?target=c")}
                        >
                            Decision Start C
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </Nav>
        )
    }
}


export default CommonNav
