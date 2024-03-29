import "whatwg-fetch"
import bootstrap from "jsview-bootstrap"
import { configure, observable, runInAction, spy, toJS } from "mobx"
import { decompileFilter, FilterDSL, i18n } from "@quinscape/automaton-js"
import ConditionPointer from "@quinscape/automaton-js/lib/ui/condition/ConditionPointer"
import {
    startup,
    config,
    getCurrentProcess,
    shutdown,
    pickSchemaTypes,
    Hub,
    subscribeToTopic,
    publish,
    GraphQLQuery,
    createDomainObject,
    StartupRegistry,
    printSchema,
    configurePromiseUI
} from "@quinscape/automaton-js"
import Layout from "../../components/Layout";

// noinspection ES6UnusedImports
import AUTOMATON_CSS from "./automaton-test.css"
import 'react-calendar/dist/Calendar.css';
import 'react-toastify/dist/ReactToastify.css';

import BigNumber from "bignumber.js";
import { GlobalConfig } from "domainql-form";
import React from "react";
import { toast } from "react-toastify";
import Q_BazAndUsers from "./queries/Q_BazAndUsers"

// set MobX configuration
configure({
    enforceActions: "observed"
});

bootstrap(
    initial => {
        return startup(
            require.context("./", true, /^.\/(scopes|domain\/.*)\.js$/),

            name => import(
                    /* webpackChunkName: "process-" */
                    /* webpackExclude: /(states|queries|composites)/ */
                    `./processes/${name}/${name}.js`
                ),
            initial,
            config => {

                config.markUntranslated = true;
                config.layout = Layout;

                StartupRegistry.addConfig("validationRules", initial.validationRules)
                StartupRegistry.addConfig("processes", initial.processes)

                // Configure German bignumber format for decimal-test/meta-config
                BigNumber.config({
                    FORMAT:{
                        "prefix": "",
                        "groupSize": 3,
                        "secondaryGroupSize": 0,
                        "groupSeparator": ".",
                        "decimalSeparator": ",",
                        "fractionGroupSize": 3,
                        "fractionGroupSeparator": " ",
                        "suffix": ""
                    }
                })

                //console.log(JSON.stringify(BigNumber.config(),null, 4))

                StartupRegistry.registerBigDecimalConverter();


                config.timestampFormat = "d.M.yyyy H:mm:ss";


                // GlobalConfig.registerStaticRenderer("Timestamp", value => {
                //
                //     const formatted = value.toFormat(config.timestampFormat);
                //
                //     const relative = value.toRelative();
                //
                //     return (
                //             <span title={ formatted } aria-label={ relative + ": " + formatted}>
                //             {
                //                 relative
                //             }
                //             </span>
                //         );
                //     }
                // )

                // spy(event => {
                //     if (event.type === "action") {
                //         console.log(`ACTION: ${event.name}(`, ... event.arguments,`)`)
                //     }
                //     else if (event.type === "reaction") {
                //         console.log(`REACTION: ${event.name}`)
                //     }
                //     else if (event.type === "error") {
                //         console.log(`ERROR: ${event.name}: ${event.message}, error = ${event.error}`)
                //     }
                // })

                FilterDSL.COMPUTED_VALUES.push({
                        name: "test",
                        type: "String",
                        description: "test - " + i18n("ComputedValue:Test Description"),
                        args: [
                            {
                                name: "name",
                                type: "String",
                                default: "abc"
                            },
                            {
                                name: "num",
                                type: "Int"
                            }
                        ]
                    }
                )

                configurePromiseUI(
                    "de.quinscape.automatontest.model.result.Result",
                    result => {

                        const { type } = result;

                        if (type === "SILENT")
                        {
                            return null;
                        }

                        return {
                            type,
                            /**
                             * React elements for result
                             */
                            render: type,
                            autoClose: type === "ERROR" ? false : null
                        }
                    }
                )


                return Hub.init(initial.connectionId)
            }
        );
    }
)
    .then(
        () => console.log("ready.")
    );

export default {
    config,
    currentProcess: getCurrentProcess,
    runInAction,
    shutdown,
    pickSchemaTypes : array => pickSchemaTypes(config.inputSchema, array),
    toJS,
    publish,
    subscribeToTopic,
    GraphQLQuery,
    createDomainObject,
    printSchema,
    toast,
    decompileFilter,
    ConditionPointer,


};
