import React, { useState, useLayoutEffect } from "react"
import ReactDOM from "react-dom"

import { Form, FormConfig, getDisplayName, useFormConfig } from "domainql-form";

import offset from "../util/offset"

import scrollPos from "../util/scrollPos";

// noinspection ES6UnusedImports
import CSS from "./ScrollTracker.css"


/**
 * Tracks position changes of focused input elements to counter-act them by setting scroll values
 */
class ScrollTracker extends React.Component {

    state = {
        extraHeight: 0,
        focusedName: "",
        bottomPortal: document.createElement("div")
    };


    componentDidMount()
    {
        const { bottomPortal } = this.state;
        bottomPortal.className="scroll-tracker-portal";

        const { body } = document;
        body.appendChild(bottomPortal);
    }

    componentWillUnmount()
    {
        const { bottomPortal } = this.state;
        const { body } = document;
        body.removeChild(bottomPortal);
    }

    /**
     * Snapshots the y-position of the currently focused form element, if there is such an element
     *
     * @param prevProps     previous props
     * @param prevState     previous state
     *
     * @return {number} y-position or null
     */
    getSnapshotBeforeUpdate(prevProps, prevState)
    {
        const { focused } = prevProps;
        const {extraHeight: prevHeight} = prevState;
        return focused && offset(focused).top - (prevHeight < 0 ? -prevHeight : 0);
    }

    /**
     * Restores the previous y-position of the focused form element if the position changed while the errors also changed.
     *
     * @param prevProps     previous props
     * @param prevState     previous state
     * @param prevOffset    previous y-position
     */
    componentDidUpdate(prevProps, prevState, prevOffset)
    {

        const { focused, formConfig } = prevProps;
        const {extraHeight: prevHeight, focusedName} = prevState;


        // if we have a previous offset / had a focused element
        if (focused && prevOffset !== null)
        {
            const currOffset = offset(focused).top - (prevHeight < 0 ? -prevHeight : 0);

            // .. and if thar offset has changed now while also the errors have changed
            if (prevOffset !== currOffset && this.props.formConfig.errors !== formConfig.errors)
            {
                // -> Restore former screen position of input

                //console.log("componentDidUpdate", {prevProps, prevState, prevOffset});
                
                const hDoc = document.body.clientHeight;
                const delta = currOffset - prevOffset;

                const scrollPotential = (hDoc - (prevHeight > 0 ? prevHeight : 0)) - window.innerHeight;

                const scrollY = scrollPos();
                const newScroll = scrollY + delta - (prevHeight < 0 ? -prevHeight : 0);

                //console.log("ScrollProbe: delta = ", delta, "newScroll", newScroll);
                // console.log("doc height", hDoc, "corrected = ", hDoc - prevHeight);
                // console.log({scrollPotential});

                if (newScroll < 0)
                {
                    //console.log("negative", newScroll, prevHeight)

                    this.setState({
                            extraHeight: newScroll,
                            focusedName: focused.name
                        },
                        () => window.scroll(0, 0)
                    )
                }
                else
                {
                    if (scrollPotential < delta)
                    {
                        const extraHeight = delta - scrollPotential;

                        //console.log("extra padding ", extraHeight)

                        this.setState({
                                extraHeight,
                                focusedName: focused.name
                            },
                            () => window.scroll(0, newScroll)
                        )
                    }
                    else
                    {
                        window.scroll(0, newScroll);
                        //console.log("scrollPotential > delta", scrollPotential, delta);
                    }
                }
            }
            else if (focused.name !== this.state.focusedName && prevHeight !== 0)
            {
                console.log("flush padding", focused.name, focusedName)
                this.setState({
                    extraHeight: 0,
                    focusedName: ""
                });

            }

        }
    }


    render()
    {
        const { children } = this.props;
        const { extraHeight, bottomPortal } = this.state;

        return (
            <React.Fragment>
                <div
                    className="scroll-tracker"
                    style={{
                        height: extraHeight < 0 ? -extraHeight : 0,
                    }}>
                </div>
                { children }
                {
                    ReactDOM.createPortal(
                        <div
                            className="scroll-tracker"
                            style={{
                                height: extraHeight > 0 ? extraHeight : 0,
                            }}>
                        </div>,
                        bottomPortal
                    )
                }


            </React.Fragment>
        );
    }
}


export default ScrollTracker
