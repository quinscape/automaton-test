import React, { useState, useCallback, useEffect } from "react"
import { Nav, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, NavItem, NavLink } from "reactstrap"

import { runProcessURI, config } from "@quinscape/automaton-js"

const ignoreTests = new Set([
    "multi-layout",
    "decision-start",
])

 
const CommonNav = props => {

    const [ dropdownOpen, setDropdownOpen ] = useState(false);

    const toggle = useCallback(() => setDropdownOpen(!dropdownOpen), [dropdownOpen]);

    const { processes } = config;

    return (
        <Nav className="ml-auto" navbar>

            <Dropdown nav isOpen={ dropdownOpen } toggle={ toggle }>
                <DropdownToggle nav caret>
                    Tests
                </DropdownToggle>
                <DropdownMenu>
                    <DropdownItem header>
                        Processes (alphabetical)
                    </DropdownItem>
                    {
                        processes.map(
                            name => (
                                <DropdownItem
                                    key={name}
                                    className="btn-sm"
                                    onClick={() => runProcessURI("/shipping/"+ name )}
                                >
                                    {
                                        name
                                    }
                                </DropdownItem>

                            )
                        )
                    }
                    <DropdownItem divider/>
                    <DropdownItem header>
                        Parametrized Processes
                    </DropdownItem>
                    <DropdownItem
                        onClick={ () => runProcessURI("/shipping/multi-layout") }
                    >
                        Multi-Layout
                    </DropdownItem>
                    <DropdownItem
                        onClick={ () => runProcessURI("/shipping/multi-layout?useDefault=1") }
                    >
                        Multi-Layout(with Default)
                    </DropdownItem>
                    <DropdownItem divider/>
                    <DropdownItem
                        onClick={ () => runProcessURI("/shipping/decision-start?target=a") }
                    >
                        Decision Start A
                    </DropdownItem>
                    <DropdownItem
                        onClick={ () => runProcessURI("/shipping/decision-start?target=b") }
                    >
                        Decision Start B
                    </DropdownItem>
                    <DropdownItem
                        onClick={ () => runProcessURI("/shipping/decision-start?target=c") }
                    >
                        Decision Start C
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>
            <NavItem>
                <NavLink
                    onClick={ () => 0}
                    title="Only exists to be focusable"
                >
                    Focus
                </NavLink>
            </NavItem>
        </Nav>
    )
};

export default CommonNav
