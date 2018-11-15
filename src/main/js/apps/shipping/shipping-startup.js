import "whatwg-fetch"
import bootstrap from 'jsview-bootstrap'
import { configure, runInAction } from "mobx"
import { startup, config, getCurrentProcess } from "automaton-js"
import Layout from "../../components/Layout";

// set MobX configuration
configure({
    enforceActions: "observed"
});


bootstrap(
    initial => {

        //console.log("INITIAL", initial);

        return startup(
            require.context("./", true, /\.js$/),
            initial,
            config => {
                config.layout = Layout;
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
