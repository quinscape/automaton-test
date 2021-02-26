import React from "react"
import { observer as fnObserver } from "mobx-react-lite";
import { ButtonToolbar, Card, CardBody } from "reactstrap";
import { Icon, Form, Field, FormContext, FormLayout } from "domainql-form"
import { Button, i18n } from "@quinscape/automaton-js"

const FileTestHome = props => {

    const { env } = props;

    const { scope } = env;

    return (
        <React.Fragment>
            <h1>
                {
                    i18n("File Test Home")
                }
            </h1>

            <ButtonToolbar>
                <Button
                    className="btn btn-secondary mr-1"
                    transition="get-resource"
                    >
                    <Icon className="fa-download mr-1"/>
                    Reload Fred from Resource
                </Button>
                <Button
                    className="btn btn-secondary mr-1"
                    transition="get-file"
                    >
                    <Icon className="fa-download mr-1"/>
                    Reload Fred from File
                </Button>
                <Button
                    className="btn btn-secondary mr-1"
                    transition="update-resource"
                    context={ scope.currentFred }
                >
                    <Icon className="fa-upload mr-1"/>
                    Update fred via Resource
                </Button>
                <Button
                    className="btn btn-secondary mr-1"
                    transition="update-file"
                    context={ scope.currentFred }
                >
                    <Icon className="fa-upload mr-1"/>
                    Update fred via File
                </Button>
            </ButtonToolbar>

            <Form
                key={ scope.counter }
                type="Fred"
                value={ scope.currentFred }
                >
                <Field name="name"/>
            </Form>
            <h2>Items</h2>
            {
                scope.currentFred.items.map((fredItem, idx) => (
                    <div
                        key={ FormContext.getUniqueId(fredItem) }
                        className="row"
                    >
                        <div className="col-11">
                            <Form
                                type="FredItem"
                                value={ fredItem }
                                options={{
                                    layout: FormLayout.HORIZONTAL,
                                    labelColumnClass: "col-2",
                                    wrapperColumnClass: "col-10",
                                }}
                            >
                                <Field name="name"/>
                                <Field name="value"/>
                                <Field name="flag"/>
                            </Form>
                        </div>
                        <div className="col-1">
                            <ButtonToolbar>
                                <Button
                                    className="btn btn-light mr-1 text-nowrap"
                                    action={ () => scope.removeItem(idx) }
                                    text="Remove Item"
                                    tooltip="Remove Item"
                                >
                                    <Icon className="fa-minus text-danger"/>
                                </Button>
                            </ButtonToolbar>
                        </div>
                    </div>
                ))
            }

            <ButtonToolbar>
                <Button
                    className="btn btn-light mr-1"
                    action={ () => scope.addItem() }
                >
                    <Icon className="fa-plus text-success mr-1"/>
                    Add Item
                </Button>
            </ButtonToolbar>

            <Card color="info" className="mt-3 small">
                <CardBody>
                    <p>
                        Demonstrates querying and updating GraphQL resources backed by JSON files, both via the
                        automaton/spring-jsview resource mechanism and raw file acces.
                    </p>
                    <p>
                        The process here is not that interesting. All the GraphQL things work just as they do with DB Types.
                        Since we don't use the generalized storeDomainObject or merge here we do need to use normal GraphQL
                        input types here.

                        Another detail here is the key mechanism of the &lt;Form/&gt; component.
                    </p>
                </CardBody>
            </Card>

        </React.Fragment>
    );
};

export default fnObserver(FileTestHome);
