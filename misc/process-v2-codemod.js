const path = require("path")
const fs = require("fs")

const compositeRE = /src\/main\/js\/apps\/.*?\/processes\/(.*?)\/composites\/(.*?).js/;
const processRE = /src\/main\/js\/apps\/.*?\/processes\/(.*?)\/(.*?).js/;

function isProcessSource(path)
{
    const m = processRE.exec(path);
    return m && m[1] === m[2];
}

function getObjectPropertyName(objectProperty)
{
    const { key } = objectProperty;

    if (key.type === "Identifier")
    {
        return key.name;
    }
    else if (key.type === "StringLiteral")
    {
        return key.value;
    }
    else
    {
        throw new Error("Invalid non-static key: " + j(objectProperty).toSource({compact: true}))
    }
}


function getStateInfos(stateMap)
{
    if (stateMap.type !== "ObjectExpression")
    {
        throw new Error("states is not an object expression: " + j(stateMap).toSource({compact: true}))
    }

    const { properties : stateProperties } = stateMap;

    return stateProperties.map(
        objectProperty => ({
            name: getObjectPropertyName(objectProperty),
            transitionMap: objectProperty.value
        })
    );
}


function trimLeading(text)
{
    const m = /\n([ ]*)/m.exec(text);
    if (m)
    {
        const spaces = m[1];
        //console.log(spaces.length)
        return text.replace(new RegExp("^" + spaces, "mg" ), "");
    }
    return null;
}


/**
 * Code mode to convert the old process structure into the new process structure.
 *
 * I used the command "jscodeshift --parser babylon -t misc/iquerygrid-codemod.js src/main/js/apps/"
 *
 * without babylon I had parser errors.
 *
 */
export default function transformer(file, api) {

    const j = api.jscodeshift;

    if (!isProcessSource(file.path))
    {
        return;
    }

    const moduleAST = j(file.source);

    let stateInfos = null;
    let startState;
    //initProcess to new format
    moduleAST
        .find(j.ReturnStatement)
        .filter( path => path.parent.parent.value.type === "FunctionDeclaration" && path.parent.parent.value.id.name === "initProcess")
        .replaceWith( path => {

            const returnStmt = path.value;

            if (returnStmt.argument.type !== "ObjectExpression")
            {
                console.warn("No ObjectExpression return in initProcess in ", file.path);
                return;
            }

            const { properties } = returnStmt.argument;

            for (let i = 0; i < properties.length; i++)
            {
                const objectProperty = properties[i];

                const name = getObjectPropertyName(objectProperty);
                if (name === "startState")
                {
                    startState = objectProperty.value;
                }
                else if (name === "states")
                {
                    stateInfos = getStateInfos(objectProperty.value)
                }
            }

            if (!startState || !stateInfos)
            {
                throw new Error("Invalid state map" + j(returnStmt.argument).toSource())
            }

            return j.returnStatement(
                startState.type === "StringLiteral" ?
                    j.identifier(
                        startState.value
                    ) : startState
            );
        });

    if (startState.type === "StringLiteral")
    {
        j(moduleAST.find(j.ImportDeclaration).at(0).get())
            .insertBefore(
                j.importDeclaration(
                    [
                        j.importDefaultSpecifier(
                            j.identifier(
                                startState.value
                            )
                        )
                    ],
                    j.stringLiteral(
                        "./states/" + startState.value
                    ),
                    "value"
                )
            )
    }
    const statesDir = path.resolve(path.dirname(file.path), "states")

    fs.mkdirSync(statesDir);

    stateInfos.forEach( ({name, transitionMap}) => {

        const statePath = path.resolve(path.dirname(file.path), `states/${name}.js`)


        const stateSource = trimLeading(`
            import ViewState from "@quinscape/automaton-js";
            import HomeB from "./HomeB";
            
            const ${name} =  new ViewState(
                ${JSON.stringify(name)},
                () => (
                    ${j(transitionMap).toSource()}
                ),
                (process, scope) => (
                    XXX
                )
            );
            
            export default ${name};
            `
        );

        fs.writeFileSync(statePath, stateSource, "utf8");
    })


    return moduleAST
        .toSource({
            trailingComma: false
        });
}

