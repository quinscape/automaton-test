import { Icon } from "domainql-form"
import React from "react"

import { ButtonToolbar } from "reactstrap"
import { Button, DataGrid, i18n } from "@quinscape/automaton-js"

import { observer as fnObserver } from "mobx-react-lite";


const MetaConfigList = props => {

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
};

export default fnObserver(MetaConfigList)
