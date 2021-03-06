import React, { useState, useCallback } from "react"
import Nav from "reactstrap/lib/Nav";
import NavItem from "reactstrap/lib/NavItem";
import Dropdown from "reactstrap/lib/Dropdown";
import DropdownToggle from "reactstrap/lib/DropdownToggle";
import DropdownMenu from "reactstrap/lib/DropdownMenu";
import DropdownItem from "reactstrap/lib/DropdownItem";

import { uri, Link, runProcessURI } from "@quinscape/automaton-js"


const CommonNav = props => {

    const [ dropdownOpen, setDropdownOpen ] = useState(false);

    const toggle = useCallback(() => setDropdownOpen(!dropdownOpen), [dropdownOpen]);

    return (
        <Nav className="ml-auto" navbar>

            <Dropdown nav isOpen={ dropdownOpen } toggle={ toggle }>
                <DropdownToggle nav caret>
                    Tests
                </DropdownToggle>
                <DropdownMenu>
                    <DropdownItem
                        onClick={ () => runProcessURI("/shipping/wire") }
                    >
                        Wire-Tests
                    </DropdownItem>
                    <DropdownItem
                        onClick={ () => runProcessURI("/shipping/crud-test") }
                    >
                        CRUD-Test
                    </DropdownItem>
                    <DropdownItem divider/>
                    <DropdownItem
                        onClick={ () => runProcessURI("/shipping/datagrid-test") }
                    >
                        DataGrid-Test
                    </DropdownItem>
                    <DropdownItem
                        onClick={ () => runProcessURI("/shipping/animalgrid-test") }
                    >
                        Animals Grid
                    </DropdownItem>
                    <DropdownItem
                        onClick={ () => runProcessURI("/shipping/extfilter-test") }
                    >
                        External Filter Grid
                    </DropdownItem>
                    <DropdownItem
                        onClick={ () => runProcessURI("/shipping/colcfg-test") }
                    >
                        Column Config Grid
                    </DropdownItem>
                    <DropdownItem
                        onClick={ () => runProcessURI("/shipping/dbview-test") }
                    >
                        DB-View in Grid
                    </DropdownItem>
                    <DropdownItem
                        onClick={ () => runProcessURI("/shipping/fk-test") }
                    >
                        ForeignKey-Test
                    </DropdownItem>
                    <DropdownItem
                        onClick={ () => runProcessURI("/shipping/assoc-entity-test") }
                    >
                        Association Test
                    </DropdownItem>
                    <DropdownItem
                        onClick={ () => runProcessURI("/shipping/query-test") }
                    >
                        Advanced iQueries
                    </DropdownItem>
                    <DropdownItem
                        onClick={ () => runProcessURI("/shipping/workingset-test") }
                    >
                        WorkingSet-CRUD
                    </DropdownItem>
                    <DropdownItem
                        onClick={ () => runProcessURI("/shipping/tree-test") }
                    >
                        Tree Test
                    </DropdownItem>
                    <DropdownItem
                        onClick={ () => runProcessURI("/shipping/collapsible-test") }
                    >
                        Collapsible Test
                    </DropdownItem>
                    <DropdownItem
                        onClick={ () => runProcessURI("/shipping/monitor-test") }
                    >
                        Monitor Test
                    </DropdownItem>
                    <DropdownItem
                        onClick={ () => runProcessURI("/shipping/merge-test") }
                    >
                        Merge Test
                    </DropdownItem>
                    <DropdownItem
                        onClick={ () => runProcessURI("/shipping/attachment-test") }
                    >
                        Attachment Test
                    </DropdownItem>
                    <DropdownItem
                        onClick={ () => runProcessURI("/shipping/iterator-test") }
                    >
                        Iterator-Test
                    </DropdownItem>
                    <DropdownItem
                        onClick={ () => runProcessURI("/shipping/file-test") }
                    >
                        File-Test
                    </DropdownItem>
                    <DropdownItem divider/>
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
        </Nav>
    )
};

export default CommonNav
