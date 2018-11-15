import React from "react"
import PropTypes from "prop-types"
import cx from "classnames"

import { Popover, PopoverHeader, PopoverBody, Badge, Collapse } from "reactstrap";

import JSONPretty from "react-json-pretty"
// noinspection ES6UnusedImports
import CSS from "./jsonData.css"


function copyToClipboard(str)
{
    const el = document.createElement("textarea");
    el.value = str;
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
}

function getDisplayName(WrappedComponent) {
    return WrappedComponent.displayName ||
           WrappedComponent.name ||
           "Component";
}

function replaceNonJSON(k,value)
{
    if (value && value.prototype && value.prototype.isReactComponent)
    {
        return "<" + getDisplayName(value) + "/>";

    }
    else if (typeof value === "function")
    {
        return value.toSource();
    }
    return value;
}


function flattenData(elems, value, path, valueOpened, setValueOpened)
{
    const index = elems.length;
    elems.push(
        <span
            key={"k" + index}
            className="json-key"
        >
                {
                    path
                }
            </span>,
        " = "
    );

    if (Array.isArray(value))
    {
        elems.push("[]\n");

        for (let i = 0; i < value.length; i++)
        {
            flattenData(elems, value[i], path + "." + i, valueOpened, setValueOpened)
        }
    }
    else if (value && typeof value === "object")
    {
        elems.push("{}\n");

        for (let name in value)
        {
            if (value.hasOwnProperty(name))
            {
                flattenData(elems, value[name], path + "." + name, valueOpened, setValueOpened)
            }
        }
    }
    else if (typeof value === "string")
    {
        elems.push(
            <span
                key={index}
                className="json-string"
            >
                {
                    JSON.stringify(value)
                }
            </span>,
            "\n"
        );
    }
    else if (value && value.prototype && value.prototype.isReactComponent)
    {
        elems.push(
            <span
                key={index}
                className="json-string"
            >

                <h6 style={{display: "inline-block"}}>
                <Badge
                    color="info"
                    title="React component"
                >
                {  getDisplayName(value) }
                </Badge>
                </h6>
            </span>,
            "\n"
        );
    }
    else if (typeof value === "function")
    {
        elems.push(
            <span
                key={index}
                className="json-string"
            >
                <FnData value={ value} valueOpened={ valueOpened } index={ index } setValueOpened={ setValueOpened } />
            </span>,
            "\n"
        );
    }
    else
    {
        elems.push(
            <span
                key={index}
                className="json-value"
            >
                {
                    JSON.stringify(value)
                }
            </span>,
            "\n"
        );
    }
}


let counter = 0;

class FnData extends React.Component
{
    toggle = () => {
        const { valueOpened, index, setValueOpened } = this.props;

        //console.log("toggle #", index, !valueOpened[index]);

        setValueOpened(index, !valueOpened[index]);
    };

    render()
    {
        const { value, valueOpened, index } = this.props;

        let source = value.toSource();

        if (!valueOpened[index])
        {
            source = source.replace(/\{[\s\S]+\}/mg, "{ ... }")
        }
        return (
            <React.Fragment>
                <button
                    type="button"
                    className="btn btn-light btn-sm"
                    onClick={ this.toggle }
                >
                    {
                        source
                    }
                </button>
            </React.Fragment>
        )
    }
}

function arrayEqual(a,b)
{
    if (a.length !== b.length)
    {
        return false;
    }

    for (let i = 0; i < a.length; i++)
    {
        if (a[i] !== b[i])
        {
            return false;
        }
    }
    return true;
}


function allTrue(length)
{
    const array = new Array(length);
    for (let i = 0; i < array.length; i++)
    {
        array[i] = true;
    }

    return array;
}


class JSONData extends React.Component {

    static propTypes = {
        name: PropTypes.string,
        value: PropTypes.any,
        maxHeight: PropTypes.number,
        flatten: PropTypes.bool
    };

    static defaultProps = {

        /** Name for js mode */
        name: "unnamed",

        /** Maximum JSON height in lines ( 0 = not limited) */
        maxHeight: 0,

        flatten: false
    };

    state = {
        flatten: this.props.flatten,
        copiedVisible: false,
        copyButtonId: "copy-button" + counter++,
        valueOpened: [],
        clipboard: null

    };

    toggleFlatten = ev => {

        //console.log("toggleFlatten");
        this.setState({flatten: !this.state.flatten});
    };

    componentDidUpdate(prevProps, prevState)
    {
        const { clipboard } = this.state;

        if (clipboard && !prevState.clipboard)
        {
            const pre = this._container.querySelector("pre");
            copyToClipboard(pre.innerText);

            this.setState({
                valueOpened: clipboard,
                clipboard: null
            });

            setTimeout(this.closePopover, 2000);
        }
    }

    copy = () => {

        const {name, value} = this.props;
        const {flatten, valueOpened} = this.state;


        let len = 0;
        if (flatten)
        {
            const rows = [];
            //console.log("flattenData(rows, value, name, ", valueOpened);
            flattenData(rows, value, name, valueOpened, this.setValueOpened);
            len = rows.length;
        }

        const origValueOpened = this.state.valueOpened;

        this.setState({
            copiedVisible: true,
            valueOpened: allTrue(len),
            clipboard: origValueOpened
        });
    };

    closePopover = () => this.setState({copiedVisible: false});


    shouldComponentUpdate(nextProps, nextState)
    {
        return (
            this.props.value !== nextProps.value ||
            this.state.flatten !== nextState.flatten ||
            this.state.copiedVisible !== nextState.copiedVisible ||
            !arrayEqual( this.state.valueOpened, nextState.valueOpened)
        )
    }

    setValueOpened = (index, value) => {

        const valueOpened = this.state.valueOpened.slice();
        valueOpened[index] = value;

        //console.log("setValueOpened" , valueOpened)

        this.setState({
            valueOpened
        })
    };

    render()
    {
        const {name, value, maxHeight} = this.props;
        const {flatten, copiedVisible, copyButtonId, valueOpened} = this.state;

        const rows = [];

        if (flatten)
        {
            //console.log("flattenData(rows, value, name, ", valueOpened);
            flattenData(rows, value, name, valueOpened, this.setValueOpened);
        }

        //console.log({name, value, flatten});

        return (
            <div className="json-data-container mt-3">
                <div className="toolbar mt-1 mr-1">
                    <button
                        type="button"
                        className="btn btn-secondary btn-sm mr-1"
                        title={flatten ? "Show as JSON" : "Show as js"}
                        onClick={this.toggleFlatten}
                    >
                        <i
                            className={cx("fas", flatten ? "fa-project-diagram" : "fa-list-alt")}
                        />
                    </button>
                    <button
                        id={copyButtonId}
                        type="button"
                        className="btn btn-secondary btn-sm mr-1"
                        title={flatten ? "Copy js to clipboard" : "Copy JSON to clipboard"}
                        onClick={this.copy}
                    >
                        <i
                            className={cx("fas", "fa-copy")}
                        />
                    </button>
                    <Popover
                        boundariesElement={document.body}
                        placement={"top-end"}
                        isOpen={copiedVisible}
                        target={copyButtonId} toggle={this.closePopover}
                    >
                        <PopoverBody>
                            {
                                flatten ? "JS copied to clipboard" : "JSON copied to clipboard"
                            }
                        </PopoverBody>
                    </Popover>
                </div>
                <div ref={e => this._container = e} className="json-data" style={{
                    maxHeight: maxHeight ? maxHeight + "em" : null
                }}>
                    {
                        flatten ?
                            <pre className=" p-1 text-sm-left">
                            <strong>const</strong> { rows }
                        </pre>
                            :
                            <JSONPretty
                                className=" p-1 text-sm-left"
                                json={value}
                                replacer={ replaceNonJSON }

                            />
                    }
                </div>

            </div>
        )
    }
}


export default JSONData
