import { React } from "react";
import { ViewState, i18n } from "@quinscape/automaton-js";
import { action, toJS } from "mobx";
import JSONData from "../../../../../components/JSONData";
import { observer as fnObserver } from "mobx-react-lite";
import CustomerList from "./CustomerList";

const CustomerDetail = new ViewState("CustomerDetail", () => ({
    "save": {
        to: CustomerList,
        action: t => {

            console.log("Transition 'save': ", toJS(t.context))
        }
    },

    "cancel": {
        to: CustomerList,
        action: t => {

            console.log("Transition 'cancel'")
        }
    }
}), props =>  {

        const { env } = props;

        const { scope } = env;

        return (
            <div>
                <h1>
                    {
                        i18n('Customer Detail')
                    }
                </h1>
                <JSONData name="customer" value={ scope.currentCustomer }/>
            </div>
        )
});

export default CustomerDetail;