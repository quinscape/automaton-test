import { React } from "react";
import { ViewState } from "@quinscape/automaton-js";
import { observer as fnObserver } from "mobx-react-lite";

const ShippingHome = new ViewState("ShippingHome", () => [], props => {

    return (
        <div>
            <h1> ShippingHome </h1>
        </div>
    )
});

export default ShippingHome;