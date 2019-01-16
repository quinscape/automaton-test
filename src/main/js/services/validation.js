import { startup, config, getCurrentProcess, addConfig } from "@quinscape/automaton-js"

import get from "lodash.get"
import toPath from "lodash.topath"

import { i18n } from "automaton-js"
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
            for (let j = 0; j < validations.length; j++)
            {
                const entry = validations[j];
                entry.re = new RegExp(entry.regexp, entry.flags);
            }
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


    const { validationRules } = config;

    if (validationRules)
    {
        const rule = findNamed(validationRules.rules, name);

        if (!rule)
        {
            console.log("No rule for ", name);
            return null;
        }

        const { fields } = rule;
        prepareFields(fields);

        const validationObject = {
            validateField: (ctx, value) => {

                const { fieldRule } = ctx;

                if (fieldRule)
                {
                    const { name, required, length, validations } = fieldRule;

                    const errors = [];

                    if (required && value === "")
                    {
                        errors.push(i18n( name + ":Required"));
                    }

                    if (length > 0 && value.length > length)
                    {
                        errors.push(i18n( name + ":Too Long"));
                    }

                    if (validations)
                    {
                        for (let i = 0; i < validations.length; i++)
                        {
                            const entry = validations[i];
                            if (entry.re.test(value))
                            {
                                errors.push(entry.message);
                            }
                        }
                    }

                    return errors.length > 0 ? errors : null;
                }

            },
            fieldContext: ctx => {

                console.log("Creat Field Context Overlay", ctx.qualifiedName);

                const path = toPath(ctx.qualifiedName);

                for (let i = 0; i < fields.length; i++)
                {
                    const fieldRule = fields[i];

                    if (matchPath(fieldRule.path, path))
                    {
                        const { mode, tooltip, placeholder, validations, length, required } = fieldRule;

                        if (mode)
                        {
                            switch(fieldRule.modePolicy)
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

                        ctx.fieldRule = (
                                (
                                    validations &&
                                    validations.length
                                )  ||
                                length > 0 ||
                                required
                            ) && fieldRule;
                    }
                }
            }
        };

        //console.log("VALIDATION OBJECT", name, validationObject, fields);

        cache[name] = validationObject;
        return validationObject;
    }
}
