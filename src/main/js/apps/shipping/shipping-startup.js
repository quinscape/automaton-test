import "whatwg-fetch"
import bootstrap from "jsview-bootstrap"
import { configure, observable, runInAction, spy, toJS } from "mobx"
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
    printSchema
} from "@quinscape/automaton-js"
import Layout from "../../components/Layout";

// noinspection ES6UnusedImports
import AUTOMATON_CSS from "./automaton-test.css"
import 'react-calendar/dist/Calendar.css';
import BigNumber from "bignumber.js";
import { GlobalConfig } from "domainql-form";
import React from "react";

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

                // spy(ev => {
                //     ev.type === "update" && console.log("MOBX", ev)
                //
                //     if (ev.oldValue === "ec2ae4c3-6615-4c77-b07e-d1c879dc69cb")
                //     {
                //         debugger;
                //     }
                // })

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
    pickSchemaTypes : array => pickSchemaTypes(config.inputSchema.schema, array),
    toJS,
    publish,
    subscribeToTopic,
    GraphQLQuery,
    createDomainObject,
    printSchema
};
