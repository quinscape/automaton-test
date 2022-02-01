import React from "react"
import cx from "classnames"

import { observer as fnObserver } from "mobx-react-lite"
import { Card, CardBody } from "reactstrap"
import { WorkingSetStatus } from "@quinscape/automaton-js"

function shorten(value, limit = 20)
{
    const strValue = String(value)

    if (strValue.length > limit)
    {
        return strValue.substr(0, limit) + "…"
    }
    return strValue
}


const defaultStyle = {
    position: "fixed",
    top: 0,
    right: 0
}

const WorkingSetHelper = fnObserver(function WorkingSetHelper({workingSet, style = defaultStyle}) {

    const items = []

    workingSet.registrations
        .filter(
            ({changes, status}) => changes.size > 0 || status === WorkingSetStatus.NEW || status === WorkingSetStatus.DELETED
        )
        .forEach(
            ({base, domainObject, changes, status}, idx) => {

                const isModified = status === WorkingSetStatus.MODIFIED
                const isNew = status === WorkingSetStatus.NEW
                const isDeleted = status === WorkingSetStatus.DELETED

                if (isModified)
                {
                    const {_type: type, id} = base

                    let first = true
                    for (let [name, change] of changes)
                    {
                        items.push(
                            <div
                                key={idx + "-" + name}
                                className="list-group-item bg-light text-dark small"
                            >
                                {
                                    first && (
                                        <h6 title={id}>
                                            {type + ":" + id.substr(0, 8)}
                                        </h6>
                                    )
                                }
                                <span title={"type = " + change.type}>
                                    {
                                        name + ": " + shorten(change.value)
                                    }
                                </span>
                            </div>
                        )
                        first = false
                    }
                }
                else if (isNew || isDeleted)
                {
                    const {_type: type, id} = domainObject

                    items.push(
                        <div
                            key={idx + "-" + name}
                            className="list-group-item bg-light text-dark small"
                        >
                            {
                                (
                                    <h6 title={id} className={ cx(isNew ? "text-success" : "text-danger") }>
                                        { isNew ? "Create":"Delete" } {type + ":" + id.substr(0, 8)}
                                    </h6>
                                )
                            }
                        </div>
                    )
                }
            }
        )

    return (
        <div
            style={style}
        >
            <Card color="light m-2">
                <CardBody>
                    <div className="list-group bg-light text-dark small">
                        {items}
                        {
                            !items.length && (
                                <div
                                    className="list-group-item bg-light text-muted small"
                                >
                                    No Changes
                                </div>
                            )
                        }
                    </div>
                </CardBody>
            </Card>
        </div>
    )
})

export default WorkingSetHelper
