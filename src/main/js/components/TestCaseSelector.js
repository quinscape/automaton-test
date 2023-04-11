import PropTypes from "prop-types"
import React, { useMemo } from "react"
import cx from "classnames"
import { observer } from "mobx-react-lite"
import { i18n } from "@quinscape/automaton-js"

let counter = 0;

const TestCaseSelector = observer(function TestCaseSelector({className = "form-control", tooltip = null, label = i18n("Load Test-Case"), cases, current = null, onCaseSelect}) {

    const id = useMemo(
        () => "test-case-select" + counter++,
        []
    )

    console.log("CASES", cases);

    const names = Object.keys(cases);

    return (
        <div className="form-group form-row">
            <label className="col-form-label"
                   htmlFor={ id }>
                { label }
            </label>
            <select
                id={ id }
                className={ className }
                defaultValue={ current }
                title={ tooltip }
                onChange={
                    ev => {
                        const name = ev.target.value
                        onCaseSelect(cases[name], name)
                    }
                }
            >
                <option
                    value=""
                >
                    {
                        i18n("Select TestCase")
                    }

                </option>
                {
                    names.map(
                        name => (
                            <option
                                key={ name }
                            >
                                {
                                    name
                                }
                            </option>
                        )
                    )
                }

            </select>
        </div>
    )
})

TestCaseSelector.propTypes = {
    /**
     * Classes for the TestCaseSelector select. Default is "form-control"
     */
    className: PropTypes.string,
    /**
     * Label for the TestCaseSelector select. Default is i18n("Load Test-Case")
     */
    label: PropTypes.string,
    /**
     * JSON object with test-case data. The first level of object keys is used as names
     * for the selector
     */
    cases: PropTypes.object.isRequired,
    /**
     * Name of the currently selected option
     */
    current: PropTypes.string,

    /**
     * Called when the user selects a new test-case ( (testCase, name) => ... )
     */
    onCaseSelect: PropTypes.func.isRequired
}

export default TestCaseSelector
