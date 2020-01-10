import React, { useReducer, useState, useEffect } from "react"

import { AutomatonDevTools, LogoutForm } from "@quinscape/automaton-js"

import {
    Collapse,
    Container,
    Navbar,
    NavbarBrand,
    NavbarToggler,
    ListGroup,
    ListGroupItem,
    Card,
    CardTitle,
    CardBody
} from "reactstrap"

import CommonNav from "./CommonNav";
import { action, observable } from "mobx";
import { observer as fnObserver } from "mobx-react-lite";

function isArrayEqual(arrayA, arrayB)
{
    //console.log("isArrayEqual", arrayA, arrayB);


    if (arrayA.length !== arrayB.length)
    {
        return false;
    }

    for (let i = 0; i < arrayA.length; i++)
    {
        if (arrayA[i] !== arrayB[i])
        {
            return false;
        }
    }
    return true;
}

const appEffects = observable(new Set());

export const registerAppEffect = action("registerAppEffect", name => {

    if (appEffects.has(name))
    {
        throw new Error("AppEffect '" + name + "' already registered on registerAppEffect");
    }

    appEffects.add(name);
});

export const unregisterAppEffect = action("unregisterAppEffect", name => {
    if (!appEffects.has(name))
    {
        throw new Error("AppEffect '" + name + "' not registered on unregisterAppEffect");
    }
    
    appEffects.delete(name);
});

const AppEffectsContainer = fnObserver(() => {

    return (
        <div
            style={{
                position: "absolute",
                top: 0,
                left: 0
            }}
        >
            <Card color="dark">
                <CardBody>
                    <CardTitle>App Effects</CardTitle>
                    <ListGroup>
                        {
                            [... appEffects.values()].map( efx => (<ListGroupItem key={ efx } color="primary">{ efx || "ROOT" }</ListGroupItem>) )
                        }
                    </ListGroup>
                </CardBody>
            </Card>
        </div>
    )
});

const EffectLayout = props => {

    const [ isNavExpanded, toggle ] = useReducer(isNavExpanded => !isNavExpanded, false);

    const { env, children } = props;

    const { contextPath } = env.config;

    const { process } = env;

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
                    Effect-Test
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
                <AppEffectsContainer/>
            </div>
            <AutomatonDevTools/>
        </Container>
    );
};

export default EffectLayout
