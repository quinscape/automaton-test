import { React } from "react";
import { ViewState, createDomainObject, Button, i18n, DataGrid } from "@quinscape/automaton-js";
import { action } from "mobx";
import { Icon } from "domainql-form";
import { observer as fnObserver } from "mobx-react-lite";
import { ButtonToolbar } from "reactstrap";
import EffectDetail from "./EffectDetail";

const EffectList = new ViewState("EffectList", () => ({
    "new-foo": {
        to: EffectDetail,
        action: t => {
            const newObj = createDomainObject("FooInput");

            newObj.name = "Unnamed Foo";
            newObj.desc = "";
            newObj.num = 0;
            newObj.flag = false;
            newObj.created = new Date();
            newObj.type = "TYPE_A";

            return scope.updateCurrent(newObj);
        }
    },

    "to-detail": {
        to: EffectDetail,
        action: t => {

            console.log("to-detail, context = ", t.context);

            return updateDetail(scope, t.context);
        }
    }
}), props => {

    const { env } = props;

    const { scope } = env;

    return (
        <React.Fragment>
            <h1>
                {
                    i18n("Effect List")
                }
            </h1>

            <ButtonToolbar>
                <Button className="btn btn-primary mr-1" transition="new-foo">
                    <Icon className="fa-save mr-1" />
                    New
                </Button>
            </ButtonToolbar>

            <DataGrid
                id="iquery-test"
                value={ scope.foos }
            >
                <DataGrid.Column
                    heading={ i18n("Action") }
                >
                    {
                        foo => (
                            <Button
                                className="btn btn-secondary text-nowrap"
                                transition="to-detail"
                                context={ foo.id }>
                                <Icon className="fa-edit" />
                                Detail
                            </Button>
                        )
                    }
                </DataGrid.Column>
                <DataGrid.Column name="name" filter="containsIgnoreCase"/>
                <DataGrid.Column name="description" filter="containsIgnoreCase"/>
                <DataGrid.Column name="owner.login" filter="containsIgnoreCase" heading={ i18n("owner") }/>
            </DataGrid>

        </React.Fragment>
    );
});

export default EffectList;