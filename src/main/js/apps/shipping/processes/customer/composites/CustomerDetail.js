import React from "react"

import { i18n } from "@quinscape/automaton-js"
import JSONData from "../../../../../components/JSONData";

import { observer as fnObserver } from "mobx-react-lite";


const CustomerDetail = props =>  {

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
};

export default fnObserver(CustomerDetail)
