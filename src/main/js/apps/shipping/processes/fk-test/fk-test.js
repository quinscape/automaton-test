import {
    observable,
    computed,
    action,
    toJS
} from "mobx";

import {
    injection,
    config,
    createDomainObject,
    storeDomainObject,
    deleteDomainObject,
    GraphQLQuery,
    backToParent,

    FilterDSL,
    extractTypeData
} from "@quinscape/automaton-js";


// deconstruct FilterDSL methods
const { field, value } = FilterDSL;

const QuxDetailQuery = new GraphQLQuery(
    // language=GraphQL
    `query iQueryQuxMain($config: QueryConfigInput!)
    {
        iQueryQuxMain(config: $config)
        {
            rows{
                id
                name
                quxAId
                quxA{
                    name
                    value
                }
                quxBName
                quxB{
                    id
                    value
                }
                quxCId1
                quxC1{
                    name
                    value
                }
                quxCId2
                quxC2{
                    name
                    value
                }
            }
        }
    }`
);

// noinspection JSUnusedGlobalSymbols
export function initProcess(process, scope)
{

    // process config

    // return process states and transitions
    return (
        {
            startState: "FKTestList",
            states: {
                "FKTestList":
                    {
                        "new-qux": {
                            to: "FKTestDetail",
                            action: t => {
                                const newObj = createDomainObject("QuxMainInput");

                                newObj.name = "Unnamed Qux";
                                newObj.desc = "";
                                newObj.num = 0;
                                newObj.flag = false;
                                newObj.created = new Date();
                                newObj.type = "TYPE_A";

                                return scope.updateCurrent(newObj);
                            }
                        },
                        "to-detail": {
                            to: "FKTestDetail",
                            action: t => {

                                console.log("to-detail, context = ", t.context);

                                return QuxDetailQuery.execute({
                                    config: {
                                        condition:
                                            field("id")
                                                .eq(
                                                    value(
                                                        "String",
                                                        t.context
                                                    )
                                                )
                                    }
                                }).then(({iQueryQuxMain}) => {

                                    if (iQueryQuxMain.rows.length === 0)
                                    {
                                        alert("Could not load Qux with id '" + t.context)
                                    }
                                    return scope.updateCurrent(iQueryQuxMain.rows[0]);
                                });
                            }
                        }
                    }
                ,
                "FKTestDetail": {
                    "save": {
                        action: t =>
                            storeDomainObject(
                                extractTypeData("QuxMainInput", t.context)
                            )
                            .then(() => scope.quxes.update())
                            .then(() => t.back(backToParent(t)))
                    },
                    "delete": {
                        to: "FKTestList",
                        discard: true,
                        confirmation: context => `Delete ${context.name} ?`,

                        action: t => {
                            const { id } = t.context;

                            return deleteDomainObject("Qux", id)
                                .then(
                                    didDelete => didDelete && scope.quxes.update()
                                )
                        }
                    },
                    "cancel": {
                        to: "FKTestList",
                        discard: true,
                        action: t => {

                            console.log("Transition 'cancel'")
                        }
                    }
                }
            }
        }
    );
}

export default class FKTestScope {

    @observable
    currentQux = null;

    /** Qux iQuery  */
    @observable
    quxes = injection(
        // language=GraphQL
        `query iQueryQuxMain($config: QueryConfigInput!)
        {
            iQueryQuxMain(config: $config)
            {
                type
                columnConfig{
                    columnStates{
                        name
                        enabled
                        sortable
                    }
                }
                queryConfig{
                    id
                    condition
                    currentPage
                    pageSize
                    sortFields
                }
                rows{
                    id
                    name
                    quxA{
                        name
                    }
                    quxBName
                    quxC1{
                        name
                    }
                    quxC2{
                        name
                    }
                }
                rowCount
            }
        }`,
        {
            "config": {
                "pageSize": 20,
                "sortFields" : ["name"]
            }
        }
    );

    @action
    updateCurrent(qux)
    {
        this.currentQux = qux;
    }
}
