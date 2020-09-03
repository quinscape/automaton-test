import { Form, Icon } from "domainql-form"
import React, { useEffect, useMemo, useState } from "react"
import { reaction } from "mobx";
import { observer as fnObserver } from "mobx-react-lite";
import { Button, CalendarField, FilterDSL, i18n, IQueryGrid as DataGrid } from "@quinscape/automaton-js"
import { MAX_DATE, MIN_DATE } from "../extfilter-test"

// deconstruct FilterDSL methods
const { and, field, value, component } = FilterDSL;

const ExtFilterHome = props => {

    const { env, name } = props;

    const { scope } = env;


    const [ ding, setDing ] = useState("bla");

    // we use an effect that depends on nothing / has no inputs and thus is removed when the component unmounts
    // the mobx reaction returns the deregister function expected from react

    useEffect(
        () => reaction(

            // the expression creates a new filter expression from the current observable state
            () => {

                //console.log("ExtFilterHome Reaction Expression")

                return (
                    // create new filter condition for filter value
                    field("created").between(
                        value(
                            scope.externalFilter.minCreated
                        ),
                        value(
                            scope.externalFilter.maxCreated
                        )
                    )
                );
            },
            // and the effect triggers the debounced condition update
            newCondition => {

                //console.log("ExtFilterHome Reaction Effect", newCondition)

                return scope.bars.updateCondition(
                    newCondition
                );
            },
            {
                delay: 50
            }
        ),
        []
    );

    return (
        <React.Fragment>
            <h1>
                {
                    i18n("Bar Values Home")
                }
            </h1>


            <div
                className="col-md-8"
            >
            <Form
                value={ scope.externalFilter }
                options={{
                    autoSubmit: true,
                    isolation: false
                }}
            >
                <CalendarField
                    name="minCreated"
                    type="Timestamp"
                    label="Start"
                    minDate={ MIN_DATE }
                    maxDate={ scope.externalFilter.maxCreated }
                />
                <CalendarField
                    name="maxCreated"
                    type="Timestamp"
                    label="End"
                    minDate={ scope.externalFilter.minCreated }
                    maxDate={ MAX_DATE }
                />
            </Form>
            </div>

            <DataGrid
                id="bar-values-grid"
                value={
                    scope.bars
                }
            >
                <DataGrid.Column
                    heading={ i18n("Action") }
                >
                    {
                        bar => (
                            <React.Fragment>
                                <Button className="btn btn-secondary" transition="to-detail" context={ bar }>
                                    <Icon className="fa-edit" />
                                    Detail
                                </Button>
                            </React.Fragment>
                        )
                    }
                </DataGrid.Column>
                <DataGrid.Column name="name" filter="containsIgnoreCase"/>
                <DataGrid.Column name="numa" filter="between"/>
                <DataGrid.Column name="numb" filter="between"/>
                <DataGrid.Column
                    heading={ i18n("Sum") }
                    filter={ (min,max) => (
                        field("numa")
                            .add(
                                field(
                                    "numb"
                                )
                            )
                            .between(
                                value(
                                    min,
                                    "Int"
                                ),
                                value(
                                    max,
                                    "Int"
                                )
                            )
                        )
                    }
                    sort={
                        field("numa").add(field("numb")) 
                    }
                >
                    {
                        bar => bar.numa + bar.numb
                    }
                </DataGrid.Column>
            </DataGrid>

        </React.Fragment>
    );
};

export default fnObserver(ExtFilterHome);
