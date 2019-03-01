import React from "react"

import { Form, getDisplayName } from "domainql-form";
import { ScrollTracker } from "@quinscape/automaton-js";


/**
 * Local application variant of the domainql-form "withForm" HOC.
 *
 * @param {React.Element} Component      component to enhance
 * @param {object} formProps            props for the <Form/>
 *
 * @return {function} Component that will automatically receive a "formConfig" prop
 */
export default function(Component, formProps)
{
    //console.log("withAppForm", Component, formProps);

    const EnhancedComponent = props => {

        const { value, options, onSubmit } = props;
        
        return (
            <Form
                { ... formProps}
                onSubmit={ onSubmit }
                value={ value }
                options={ options }
            >
                {
                    formConfig => (
                        <div
                        >
                            <ScrollTracker
                                formConfig={ formConfig }
                            >
                                <Component
                                    { ... props }
                                    formConfig={ formConfig }
                                />
                            </ScrollTracker>
                        </div>
                    )
                }
            </Form>
        );
    };

    EnhancedComponent.displayName = getDisplayName(Component);

    return EnhancedComponent;
}
