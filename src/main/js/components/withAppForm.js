import React, { useState, useCallback } from "react"

import { Form, FormConfig, getDisplayName, useFormConfig } from "domainql-form";
import ScrollTracker from "./ScrollTracker";


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

        const [ focused, setFocused ] = useState(null);

        const onFocus = ev => {

            setFocused(ev.target);
        };

        const onBlur = ev => {
            if (focused === ev.target)
            {
                setFocused(null);
            }
        };


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
                            onFocusCapture={ onFocus }
                            onBlurCapture={ onBlur }
                        >
                            <ScrollTracker
                                formConfig={ formConfig }
                                focused={ focused }
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
