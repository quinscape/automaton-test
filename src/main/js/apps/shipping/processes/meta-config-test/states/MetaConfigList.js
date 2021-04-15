import { React } from "react";
import { ViewState, createDomainObject, config, Button, DataGrid, i18n } from "@quinscape/automaton-js";
import { action } from "mobx";
import Q_MetaConfigDetail from "../queries/Q_MetaConfigDetail";
import { Icon } from "domainql-form";
import { ButtonToolbar } from "reactstrap";
import { observer as fnObserver } from "mobx-react-lite";
import MetaConfigDetail from "./MetaConfigDetail";

const MetaConfigList = new ViewState("MetaConfigList", () => ({
    "new-meta-config": {
        to: MetaConfigDetail,
        action: t => {
            const newInstance = createDomainObject("MetaConfig");
            newInstance.name = "Unnamed";
            scope.updateCurrent(newInstance)
        }
    },

    "to-detail": {
        to: MetaConfigDetail,
        action: t => {

            const id = t.context;

            return Q_MetaConfigDetail.execute({
                config: {
                    condition:
                        field("id")
                            .eq(
                                value(
                                    id
                                )
                            )
                }
            }).then(({iQueryMetaConfig}) => {

                if (iQueryMetaConfig.rows.length === 0)
                {
                    alert("Could not load MetaConfig with id '" + id)
                }

                scope.updateCurrent(
                    config.inputSchema.clone(
                        iQueryMetaConfig.rows[0]
                    )
                );
            })
        }
    }
}), props => {

    const { env } = props;

    const { scope } = env;

    return (
        <div>
            <h3>
                {
                    i18n("Meta Config List")
                }
                <small>
                    Meta Field config example. Tests &lt;FieldMetaButton/&gt; configuration
                </small>
            </h3>
            <ButtonToolbar>
                <Button className="btn btn-secondary mr-1" transition="new-meta-config">
                    <Icon className="fa-plus-circle mr-1" />
                    New MetaConfig
                </Button>
            </ButtonToolbar>


            <DataGrid
                value={ scope.metaConfigs }
            >
                <DataGrid.Column
                    heading={ i18n("Action") }
                >
                    {
                        metaConfig => (
                            <Button
                                className="btn btn-secondary"
                                transition="to-detail"
                                context={ metaConfig.id }
                            >
                                <Icon className="fa-edit mr-1" />
                                Detail
                            </Button>
                        )
                    }
                </DataGrid.Column>
                <DataGrid.Column name="name"/>
            </DataGrid>
        </div>
    );
});

export default MetaConfigList;