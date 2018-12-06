import { computed, observable } from "mobx";


export default class WireTestResult {

    @observable id;

    @observable created;

    @observable check;

    @computed get successful()
    {
        return (
            this.id === "13a4ad86-e2c3-4979-81e2-a8f102b501c1" &&
            this.created.toISOString() === "2018-11-16T00:00:00.000Z" &&
            this.check === "2018-11-16T00:00:00Z:123"
        );
    }
}