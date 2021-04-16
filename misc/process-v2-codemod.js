/*
 * Code mode to convert the old automaton process structure into the new process structure.
 *
 */

const path = require("path")
const fs = require("fs")

const processRE = /src\/main\/js\/apps\/.*?\/processes\/(.*?)\/(.*?).js/;

function getProcessSourceMatch(path)
{
    const m = processRE.exec(path);
    return m && m[1] === m[2] ? m[1] : null;
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


const TO_SOURCE_OPTIONS = {
    tabWidth: 4,
    useTabs: false
}

function getStateInfos(stateMap)
{
    if (stateMap.type !== "ObjectExpression")
    {
        throw new Error("states is not an object expression: " + j(stateMap).toSource(TO_SOURCE_OPTIONS))
    }

    const { properties : stateProperties } = stateMap;

    return stateProperties.map(
        objectProperty => ({
            name: getObjectPropertyName(objectProperty),
            transitionMap: objectProperty.value
        })
    );
}


/**
 * Does a safe rename of a variable declaration and usage in the given collection.
 *
 * It checks if the target exists and counts up until it doesn't.
 *
 * @param collection        collection containing the code
 * @param {String} [to]     target name. If it is not given, it will rename to the same variable, effectively counting up that variable
 *
 * @return renamed collection
 */
function safeRenameTarget(collection, to = from)
{
    let count = 2;
    const base = to;

    while (collection.findVariableDeclarators(to).length)
    {
        to = base + count++;
    }

    //console.log("safeRenameTarget", to)

    return to;

}


function flattenStartStateFunction(j, startState, path)
{
    if (startState.type !== "ArrowFunctionExpression")
    {
        throw new Error("Invalid startState value in " + file.path + ": " + j(startState).toSource(TO_SOURCE_OPTIONS) )
    }

    let arrowFunction = j(startState);

    const transitionVar = startState.params[0].name;

    // find out if the start state function uses "t.context"
    const usesTransitionContext = !!(
        arrowFunction
            .find(j.Identifier, { name: transitionVar} )
            .closest(j.MemberExpression)
            .filter(
                path => (path.value.property.name === "context")
            )
            .length
    );


    arrowFunction
        .find(j.ObjectPattern)
        .closest(j.VariableDeclaration)
        .replaceWith(
            path => {

                const decl = path.value;
                const declarator = decl.declarations[0];


                const objectPattern = declarator.id;

                const { properties } = objectPattern;

                //console.log("DECL", j(declarator.init).toSource(TO_SOURCE_OPTIONS))

                return properties.map(
                    prop => {
                        return j.variableDeclaration(
                            decl.kind,
                            [
                                j.variableDeclarator(
                                    prop.value,
                                    j.memberExpression(
                                        declarator.init,
                                        prop.key,
                                        false
                                    )
                                )
                            ]
                        )
                    }
                );
            }
        )

    arrowFunction
        .findVariableDeclarators("target")
        .renameTo(safeRenameTarget(arrowFunction, "_target"))

    if (usesTransitionContext)
    {
        arrowFunction
            .findVariableDeclarators("context")
            .renameTo(safeRenameTarget(arrowFunction, "_context"))
    }

    // we always declare target
    const decls = [
        j.variableDeclarator(
            j.identifier("target"),
            null
        )
    ];

    if (usesTransitionContext)
    {
        // we also declare context if the function uses it
        decls.push(
            j.variableDeclarator(
                j.identifier("context"),
                null
            )
        )
    }
    // replace `t.context` with `context` and `t.target` with `target`
    arrowFunction
        .find(j.Identifier, { name: transitionVar} )
        .closest(j.MemberExpression)
        .replaceWith(
            path => {

                const { property } = path.value;

                if (property.type !== "Identifier")
                {
                    throw new Error(`Invalid access to transition in start state function in ${ path }: ${ j(path.parent).toSource(TO_SOURCE_OPTIONS) }`)
                }

                if (property.name === "context")
                {
                    return j.identifier("context");
                }
                else if (property.name === "target")
                {
                    return j.identifier("target");
                }
                else
                {
                    throw new Error(`Non-supported transition membmer access in start state function in ${ path }: ${ j(path.parent).toSource(TO_SOURCE_OPTIONS) }`)
                }
            }
        )

    const codeFromStartStateFunction = arrowFunction.length ? arrowFunction.get().value.body.body : [];

    //console.log("CODE", j(codeFromStartStateFunction).toSource(TO_SOURCE_OPTIONS).join("\n"))

    return (
        j.functionDeclaration(
            j.identifier("initProcess"),
            [
                j.identifier("process"),
                j.identifier("scope")
            ],
            j.blockStatement(
                [
                    j.variableDeclaration(
                        "let",
                        decls
                    ),

                    ... codeFromStartStateFunction,

                    j.returnStatement(
                        j.identifier(
                            "target"
                        )
                    )
                ]
            )
        )
    );
}


function replaceStateReferences(j, node, stateNames, imported)
{
    j(node)
        .find(j.StringLiteral)
        .filter(path => stateNames.has(path.node.value))
        .replaceWith(
            path => {

                imported.add(path.node.value)

                return j.identifier(
                    path.node.value
                )
            }
        )

}


function createImportsForStates(j, importedStates, importPrefix)
{
    return Array.from(importedStates).map(
        name => j.importDeclaration(
            [
                j.importDefaultSpecifier(
                    j.identifier(
                        name
                    )
                )
            ],
            j.stringLiteral(
                importPrefix + name
            ),
            "value"
        )
    );
}


function transformInitProcess(moduleAST, j, file)
{
    let stateInfos = null;
    let startState = null;
    let stateNames = null;

    const importedStates = new Set();

    //initProcess to new format
    moduleAST
        .find(j.ReturnStatement)
        .closest(j.FunctionDeclaration)
        .filter( path => path.value.id.name === "initProcess" )
        .replaceWith(path => {

            const returnStmt = path.value.body.body[ path.value.body.body.length - 1 ];

            if (returnStmt.argument.type !== "ObjectExpression")
            {
                console.warn("No ObjectExpression return in initProcess in ", file.path);
                return;
            }

            const {properties} = returnStmt.argument;

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
                    stateNames = new Set(
                        stateInfos.map( i => i.name)
                    );
                }
            }

            if (startState.type === "StringLiteral")
            {
                return  j.functionDeclaration(
                    j.identifier("initProcess"),
                    [
                        j.identifier("process"),
                        j.identifier("scope")
                    ],
                    j.blockStatement(
                        [
                            ... path.value.body.body.slice(0, -1),

                            j.returnStatement(
                                j.identifier(
                                    startState.value
                                )
                            )
                        ]
                    )
                )
            }
            else
            {
                const flattenedFn = flattenStartStateFunction(
                    j,
                    startState,
                    file.path,
                    stateNames
                );

                replaceStateReferences(j, flattenedFn, stateNames, importedStates);

                return flattenedFn;
            }
        }
    );

    if (!startState || !stateInfos)
    {
        throw new Error("Invalid state map in " + file.path)
    }


    moduleAST
        .find(j.StringLiteral)
        .filter(path => stateNames.has(path.node.value))
        .replaceWith(
            path => {
                return j.identifier(
                    path.node.value
                )
            }
        )


    if (startState.type === "StringLiteral")
    {
        importedStates.add(startState.value);
    }

    const imports = moduleAST.find(j.ImportDeclaration);

    imports.at(imports.length - 1)
        .insertAfter(
            createImportsForStates(j, importedStates, "./states/")
        )

    return stateInfos;
}


function importReferenced(j, mergedImports, referenced)
{

    // convert all reference identifiers to a map mapping source names to an array of referenced import specifiers.
    const referencedSpecifiers = new Map();
    Array.from(referenced).forEach( name => {

        const entry = mergedImports.get(name);
        if (entry)
        {
            const { source } = entry;

            let array = referencedSpecifiers.get(source.value)
            if (!array)
            {
                array = [ entry.specifier ];
                referencedSpecifiers.set(source.value, array);
            }
            else
            {
                if (!array.find( spec => spec.local.name === entry.specifier.local.name ))
                {
                    array.push( entry.specifier );
                }
            }
        }
    })

    const importNodes = [];

    for (let [source, specifiers] of referencedSpecifiers)
    {
        importNodes.push(
            j.importDeclaration(
                specifiers,
                j.stringLiteral(
                    source
                ),
                "value"
            )
        )
    }

    //console.log("importReferenced", referenced, "=>", j(importNodes).toSource())

    return importNodes;
}

function addNamedImport(j, imports, name, source)
{
    imports.set(name, {
        specifier: j.importSpecifier(
            j.identifier(
                name
            ),
            j.identifier(
                name
            )
        ),
        source: j.stringLiteral(source),
    })
}

function addDefaultImport(j, imports, name, source)
{
    imports.set(name, {
        specifier: j.importDefaultSpecifier(
            j.identifier(
                name
            )
        ),
        source: j.stringLiteral(source),
    })
}


function createStateModule(info, file, j, mergedImports, compositeAST, stateNames, processFilterDSLImports)
{
    const {name, transitionMap} = info;

    mergedImports = new Map(mergedImports);

    addNamedImport(
        j, mergedImports, "ViewState", "@quinscape/automaton-js"
    )
    addNamedImport(
        j, mergedImports, "FilterDSL", "@quinscape/automaton-js"
    )
    addDefaultImport
    (
        j, mergedImports, "React", "react"
    )

    let compositeComponent = null;
    compositeAST.find(j.VariableDeclaration)
        .filter( path => path.value.declarations[0].id.name === name)
        .forEach( path => {

            compositeComponent = path.value.declarations[0].init;
            if (j.type === "CallExpression")
            {
               compositeComponent = compositeComponent.arguments[0];
            }
        });


    const referenced = new Set();
    referenced.add("React");
    referenced.add("ViewState");

    const importedStates = new Set();

    replaceStateReferences(j, transitionMap, stateNames, importedStates)

    findReferencedIdentifiers(j, j(transitionMap))
        .forEach(
            path => {
                const identifier = path.value.name;
                referenced.add(identifier);
            }
        )

    const componentAST = j([compositeComponent]);
    findReferencedIdentifiers(j, componentAST)
        .forEach(
            path => {
                const identifier = path.value.name;
                referenced.add(identifier);
            }
        )

    componentAST.find(j.JSXElement)
        .forEach(
            path => {
                const { name : jsxName } = path.value.openingElement;

                let identifier;
                if (jsxName.type === "JSXIdentifier")
                {
                    identifier = jsxName.name;
                }
                else if (jsxName.type === "JSXMemberExpression")
                {
                    identifier = jsxName.object.name;
                }

                if (identifier[0] < "a")
                {
                    referenced.add(identifier);
                }
            }
        )


    if (!compositeComponent)
    {
        throw new Error("Could not find declaration for composite " + name);
    }

    if (compositeComponent.type !== "FunctionExpression" &&  compositeComponent.type !== "ArrowFunctionExpression")
    {
        throw new Error("Invalid value for composite export " + name + ": " + j(compositeComponent).toSource(TO_SOURCE_OPTIONS))
    }

    const viewStateIdent = j.identifier(
        name
    );

    importedStates.delete(name);

    const filterDSLImports = getFilterDSLImports(j, compositeAST);

    Array.from(processFilterDSLImports).forEach( i => filterDSLImports.add(i))

    const usedFilterDSLImports = Array.from(filterDSLImports).filter(name => referenced.has(name));

    if (usedFilterDSLImports.length)
    {
        referenced.add("FilterDSL")
    }

    const stateModuleAST = j(
        j.program(
            [
                ... importReferenced(j, mergedImports, referenced),

                ... createImportsForStates(j, importedStates, "./"),

                j.variableDeclaration(
                    "const",
                    [
                        j.variableDeclarator(
                            viewStateIdent,
                            j.newExpression(
                                j.identifier(
                                    "ViewState"
                                ),
                                [
                                    j.stringLiteral(name),
                                    j.arrowFunctionExpression(
                                        [
                                            j.identifier("process"),
                                            j.identifier("scope")
                                        ],
                                        transitionMap
                                    ),
                                    compositeComponent
                                ]
                            )
                        )
                    ]
                ),
                j.exportDefaultDeclaration(
                    viewStateIdent
                )
            ]
        )
    );

    declareUsedFilterDSLImports(j, stateModuleAST, usedFilterDSLImports);

    return stateModuleAST;
}


function getImports(j, moduleAST, modulePath)
{
    const imports = new Map();


    moduleAST.find(j.ImportDeclaration)
        .forEach(
            importDecl => {

                 const { specifiers, source } = importDecl.value;

                for (let i = 0; i < specifiers.length; i++)
                {
                    const specifier = specifiers[i];

                    imports.set(
                        specifier.local.name, {
                            specifier,
                            source,
                            resolved: withJsExtension(source.value[0] === "." ? path.resolve(path.dirname(modulePath), source.value) : source.value)
                    })
                }
            }
        )

    return imports;
}

// function printImports(importsA)
// {
//     return Array.from(importsA.values()).map(spec => {
//         if (spec.specifier.type === "ImportDefaultSpecifier")
//         {
//             return spec.specifier.local.name + " from " + spec.source.value;
//         }
//         else
//         {
//             return "{" + spec.specifier.local.name + "}"  + " from " + spec.source.value;
//
//         }
//     })
// }


function mergeImports(j, processName, stateName, importsA, importsB)
{

    const merged = new Map();
    for (let name of importsB.keys())
    {
        if (importsA.has(name))
        {
            const entryA = importsA.get(name);
            const entryB = importsB.get(name);

            if (entryA.resolved !== entryB.resolved )
            {
                throw new Error("Error in process " + processName + ": Import conflict in state " + stateName + " for import " + name + ". Is imported from " + entryA.resolved + " and  " + entryB.resolved);
            }

            if (entryA.specifier.type === "ImportDefaultSpecifier")
            {
                if (entryB.specifier.type !== "ImportDefaultSpecifier")
                {
                    throw new Error("Error in process " + processName + ": Import conflict in state " + stateName + " for import " + name + ". Conflict between default import and named import " + entryB.specifier.local.name);
                }
            }
            else
            {
                if (entryB.specifier.type === "ImportDefaultSpecifier")
                {
                    throw new Error("Error in process " + processName + ": Import conflict in state " + stateName + " for import " + name + ". Conflict between named import " + entryA.specifier.local.name + "and  default import.");
                }
            }
            merged.set(name, importsA.get(name))
        }
        else
        {
            merged.set(name, importsB.get(name))
        }

    }

    for (let name of importsA.keys())
    {
        if (!merged.has(name))
        {
            merged.set(name, importsA.get(name))
        }
    }

    //console.log("MERGE IMPORTS", printImports(importsA), printImports(importsB), " => ", printImports(merged))

    return merged;
}


function withJsExtension(name)
{
    const pos = name.lastIndexOf(".js");

    if (pos !== name.length - 3)
    {
        return name + ".js";
    }
    return name;
}


/**
 * Modifies the collected imports from the composite folder so that "./Something" are  "../composites/Something"
 * We don't need to fix "../" paths because the old "composites" and the new "states" have the same parent.
 *
 * @param  j
 * @param imports
 */
function fixCompositeImports(j, imports)
{
    for (let entry of imports.values())
    {
        if (entry.source.value.indexOf("./") === 0)
        {
            entry.source = j.stringLiteral(
                "../composites/" + entry.source.value.substr(2)
            )
        }
    }
}

/**
 * Modifies the collected imports from process module so that "./Something" is turned into  "../Something" and
 * "../Something" becomes "../../Something" following the move from the root of the process dir to the states dir
 *
 * @param  j
 * @param imports
 */
function fixProcessImports(j, imports)
{
    for (let entry of imports.values())
    {
        if (entry.source.value.indexOf("./") === 0)
        {
            entry.source = j.stringLiteral(
                "." + entry.source.value
            )
        }
        else if (entry.source.value.indexOf("../") === 0)
        {
            entry.source = j.stringLiteral(
                "../" + entry.source.value
            )
        }
    }
}


function findReferencedIdentifiers(j, coll)
{
    return coll
        .find(j.Identifier)
        .filter(
            path => {

                if (path.value.type !== "JSXIdentifier")
                {
                    if (!path.parent)
                    {
                        return true;
                    }
                    else
                    {

                        if (!(path.parent.value.type === "ObjectProperty" && !path.parent.value.computed))
                        {
                            return true;
                        }

                    }
                }
                return false;
            }
        )
}


function declareUsedFilterDSLImports(j, moduleAST, usedFilterDSLImports)
{
    if (usedFilterDSLImports.length)
    {
        let existing = moduleAST
            .find(j.VariableDeclarator, { id: { type: "ObjectPattern"}, init: { name : "FilterDSL"}});

        const declarator = j.variableDeclarator(
            j.objectPattern(
                usedFilterDSLImports.map(name => {
                    const identifier = j.identifier(name);
                    const prop = j.objectProperty(
                        identifier,
                        identifier
                    );
                    prop.shorthand = true;
                    return prop;
                })
            ),
            j.identifier(
                "FilterDSL"
            )
        );

        if (existing.length)
        {
            existing.replaceWith( declarator)
        }
        else
        {
            const imports = moduleAST
                .find(j.ImportDeclaration)
            imports
                .at(imports.length - 1)
                .insertAfter(
                    j.variableDeclaration(
                        "const",
                        [
                            declarator
                        ]
                    )
                )
        }
    }
}


function cleanupImports(j, moduleAST, filterDSLImports)
{

    let prog = moduleAST.get();

    if (prog.node.type !== "Program")
    {
        prog = moduleAST
            .find(j.Program)
            .get();
    }
    const referenced = new Set();

    findReferencedIdentifiers(j, j(prog.node.body.filter(n => n.type !== "ImportDeclaration")))
        .forEach(
            path => referenced.add(path.node.name)
        )

    referenced.add("observable");
    referenced.add("action");
    referenced.add("computed");

    const usedFilterDSLImports = Array.from(filterDSLImports).filter(name => referenced.has(name));
    declareUsedFilterDSLImports(j, moduleAST, usedFilterDSLImports);

    moduleAST
        .find(j.ImportDeclaration)
        .replaceWith(
            path => {
                const decl = path.value;

                const newSpecifiers = decl.specifiers.filter( spec => referenced.has(spec.local.name))

                if (newSpecifiers.length)
                {
                    return  j.importDeclaration(
                        newSpecifiers,
                        decl.source,
                        "value"
                    )
                }
                else
                {
                    return j.emptyStatement();
                }

            }
        )


}


function getFilterDSLImports(j, moduleAST)
{
    const filterDSLImports = new Set();

    moduleAST
        .find(j.VariableDeclarator, { id: { type: "ObjectPattern"}, init: { name : "FilterDSL"}})
        .forEach(
            path => {

                const { properties } = path.value.id;

                for (let i = 0; i < properties.length; i++)
                {
                    filterDSLImports.add(properties[i].value.name);
                }

            }
        )

    return filterDSLImports;
}


export default function transformer(file, api) {

    const j = api.jscodeshift;

    const processName = getProcessSourceMatch(file.path);
    if (!processName)
    {
        return;
    }

    const moduleAST = j(file.source);

    const filterDSLImports = getFilterDSLImports(j, moduleAST);

    const processImports = getImports(j, moduleAST, file.path);

    fixProcessImports(j, processImports);

    const stateInfos = transformInitProcess(moduleAST, j, file);

    const statesDir = path.resolve(path.dirname(file.path), "states")


    if (!fs.existsSync(statesDir))
    {
        fs.mkdirSync(statesDir);
    }

    const stateNames = new Set(
        stateInfos.map( i => i.name)
    );


    stateInfos.forEach( info => {

        const { name } = info;

        const compositePath = path.resolve(
            path.dirname(file.path), "composites", withJsExtension(name)
        );
        const compositeSource = fs.readFileSync(compositePath, "utf8");
        const compositeAST = j(compositeSource);

        const compositeImports = getImports(j, compositeAST, compositePath)

        fixCompositeImports(j, compositeImports);

        const mergedImports = mergeImports(j, processName, name, processImports, compositeImports)

        const newModuleAST = createStateModule(info, file, j, mergedImports, compositeAST, stateNames, filterDSLImports);

        const statePath = path.resolve(
            path.dirname(file.path), "states", withJsExtension(name)
        )

        fs.writeFileSync(statePath, newModuleAST.toSource(TO_SOURCE_OPTIONS), "utf8");
        fs.rmSync(compositePath);

    })

    cleanupImports(j, moduleAST, filterDSLImports);

    return moduleAST
        .toSource({
            trailingComma: false
        });
}

module.exports.parser = 'babylon';
