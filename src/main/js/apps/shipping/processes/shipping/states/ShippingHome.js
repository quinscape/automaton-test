import React from "react";
import { ViewState } from "@quinscape/automaton-js";

const ShippingHome = new ViewState("ShippingHome", (process, scope) => [], props => {

    return (
        <div>
            <h1> ShippingHome </h1>
        </div>
    )
});

export default ShippingHome;