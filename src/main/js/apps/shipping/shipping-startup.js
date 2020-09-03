import "whatwg-fetch"
import bootstrap from "jsview-bootstrap"
import { configure, observable, runInAction, spy, toJS } from "mobx"
import {
    startup,
    config,
    getCurrentProcess,
    addConfig,
    shutdown,
    pickSchemaTypes,
    Hub,
    subscribeToTopic,
    publish,
    GraphQLQuery,
    Attachments
} from "@quinscape/automaton-js"
import Layout from "../../components/Layout";

// noinspection ES6UnusedImports
import AUTOMATON_CSS from "./automaton-test.css"
import 'react-calendar/dist/Calendar.css';

// set MobX configuration
configure({
    enforceActions: "observed"
});

bootstrap(
    initial => {
        return startup(
            require.context("./", true, /\.js$/),
            initial,
            config => {

                config.layout = Layout;
                addConfig("validationRules", initial.validationRules)

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
    pickSchemaTypes,
    toJS,
    publish,
    subscribeToTopic,
    GraphQLQuery,
    Attachments
};
