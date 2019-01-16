import "whatwg-fetch"
import bootstrap from 'jsview-bootstrap'
import { configure, runInAction } from "mobx"
import { startup, config, getCurrentProcess, addConfig } from "@quinscape/automaton-js"
import Layout from "../../components/Layout";

// noinspection ES6UnusedImports
import AUTOMATON_CSS from "./automaton-test.css"

// set MobX configuration
configure({
//    enforceActions: "observed"
});


bootstrap(
    initial => {

        console.log("INITIAL", initial);

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


module.exports = {
    config,
    currentProcess: getCurrentProcess,
    runInAction
};
