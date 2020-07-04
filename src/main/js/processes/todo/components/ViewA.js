import React from "react"

import FieldMode from "domainql-form/lib/FieldMode"
import FormBlock from "domainql-form/lib/FormBlock"
import Field from "domainql-form/lib/Field"


// custom imports

@observer
class ViewA extends React.Component {

    render()
    {
        const { scope, appScope } = this.props;




        return (
            <div>
                <h1> ViewA </h1>

                {
                    flag && <FooForm/>
                }

            </div>
        )
    }
}

import React from "react"

class FooForm extends React.Component {

    render()
    {

        return (
            <div>
                <h1> FooForm </h1>
            </div>
        )
    }
}

export const withForm(FooForm, {
    name: "FooInput"

});


export default ViewA

const JSON = {
    name : "ViewA",
    root: {
        name: "div",
        attrs: {

        },
        kids : [
            {
                name: "Form",
                attrs: {
                    horizontal: "{ true }"

                },
                kids : [
                    {
                        name: "FormBlock",
                        attrs: {
                            rendered: "flag"

                        },
                        kids : [
                            {
                                name: "Field",
                                attrs: {
                                    name: "\"name\"",
                                    mode: "FieldMode.disabledIf(flag)"
                                }
                            },
                            {
                                name: "Field",
                                attrs: {
                                    name: "\"num\""
                                }
                            }

                        ]
                    }

                ]
            }


        ]
    }
}
