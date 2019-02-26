import React from "react"
import { observer as fnObserver } from "mobx-react-lite";
import get from "lodash.get";

const FooList = props => {

    const { path, ob } = props;

    const foos = get(ob, path);

    return (
        <ul>
            {
                foos.map(foo => <li key={foo.id}>{ foo.code }</li> )
            }
        </ul>
    )
}

export default fnObserver(FooList)
