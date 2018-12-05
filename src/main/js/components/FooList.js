import React from "react"
import { observer } from "mobx-react";
import get from "lodash.get";

@observer
class FooList extends React.Component {

    render()
    {
        const { path, ob } = this.props;

        const foos = get(ob, path);

        return (
            <ul>
                {
                    foos.map(foo => <li key={foo.id}>{ foo.code }</li> )
                }
            </ul>
        )
    }
}

export default FooList
