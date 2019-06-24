import "whatwg-fetch"
import bootstrap from 'jsview-bootstrap'
import { configure, observable, runInAction, toJS } from "mobx"
import { startup, config, getCurrentProcess, addConfig, shutdown, InteractiveQuery } from "@quinscape/automaton-js"
import Layout from "../../components/Layout";

// noinspection ES6UnusedImports
import AUTOMATON_CSS from "./automaton-test.css"

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
            }
        );
    },
    () => console.log("ready.")
);


export default {
    config,
    currentProcess: getCurrentProcess,
    runInAction,
    shutdown,
    toJS
};
