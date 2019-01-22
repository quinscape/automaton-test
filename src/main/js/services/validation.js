import { config, i18n } from "@quinscape/automaton-js"
import toPath from "lodash.topath"

import { FieldMode } from "domainql-form";


const cache = {

};

function findNamed(array, name)
{
    for (let i = 0; i < array.length; i++)
    {
        const elem = array[i];
        if (elem.name === name)
        {
            return elem;
        }
    }
    return null;
}


function prepareFields(fields)
{
    for (let i = 0; i < fields.length; i++)
    {
        const field = fields[i];
        field.path = toPath(field.name);

        const {validations} = field;

        if (validations)
        {
            const out = [];

            for (let j = 0; j < validations.length; j++)
            {
                const entry = validations[j];
                const re = new RegExp(
                    entry.regexp,
                    (entry.caseInsensitive ? "i" : "") + (entry.multiLine ? "m" : "")
                );
                out.push(re, entry.message);
            }

            // overwrite with flat array
            field.validations = out;
        }
    }
}


export function matchPath(rulePath, current)
{
    if (rulePath.length !== current.length)
    {
        return false;
    }

    for (let i = 0; i < rulePath.length; i++)
    {
        const ruleValue = rulePath[i];
        const value = current[i];

        if (
            !(ruleValue === "*" && typeof value === "number") &&
            ruleValue !== value
        )
        {
            return false;
        }
    }
    return true;
}


/**
 * Overrides the given field context with the field-configuration relating
 * parts of the field rule.
 *
 * @param {Object} ctx          field context
 * @param {Object} fieldRule    field rule
 */
function overrideContextWithRule(ctx, fieldRule)
{
    const {mode, tooltip, placeholder, validations, length, required} = fieldRule;

    // if the mode is set in the rule, ..
    if (mode)
    {
        // ..apply according to policy
        switch (fieldRule.modePolicy)
        {
            case "IGNORE_LOCAL":
                ctx.mode = mode;
                break;
            case "OVERRIDE":
                ctx.mode = ctx.mode !== FieldMode.NORMAL ? ctx.mode : mode;
        }
    }

    if (tooltip)
    {
        ctx.tooltip = tooltip;
    }

    if (placeholder)
    {
        ctx.placeholder = placeholder;
    }

    // copy field rule to field context if it contains validations
    ctx.fieldRule = ( (validations && validations.length) || length > 0 || required) && fieldRule;
}


function evaluateRule(fieldRule, value)
{
    const {name, required, length, validations} = fieldRule;

    const errors = [];

    if (required && value === "")
    {
        errors.push(i18n(name + ":Required"));
    }

    if (length > 0 && value.length > length)
    {
        errors.push(i18n(name + ":Too Long"));
    }

    if (validations)
    {
        for (let i = 0; i < validations.length; i += 2)
        {
            const re = validations[i];
            const message = validations[i + 1];
            if (!re.test(value))
            {
                errors.push(message);
            }
        }
    }

    return errors.length > 0 ? errors : null;
}


/**
 * Returns a high-level validation object for domainql-form that evaluates the externalized rules.json files.
 *
 * @param name
 * @return {object}
 */
export default function(name)
{
    if (cache.hasOwnProperty(name))
    {
        return cache[name];
    }


    const { validationRules  } = config;

    if (validationRules)
    {
        const rule = findNamed(validationRules.rules, name);

        if (!rule)
        {
            console.log("No rule for", name);
            return null;
        }

        const { fields  } = rule;
        prepareFields(fields);

        const validationObject = {
            validateField: (ctx, value) => {

                const { fieldRule  } = ctx;

                if (fieldRule)
                {
                    return evaluateRule(fieldRule, value);
                }

            },
            fieldContext: ctx => {

                //console.log("Create Field Context Overlay", ctx.qualifiedName);

                const path = toPath(ctx.qualifiedName);

                for (let i = 0; i < fields.length; i++)
                {
                    const fieldRule = fields[i];

                    if (matchPath(fieldRule.path, path))
                    {
                        overrideContextWithRule(ctx, fieldRule);
                    }
                }
            }
        };

        //console.log("VALIDATION OBJECT", name, validationObject, fields);

        cache[name] = validationObject;
        
        return validationObject;
    }
}
