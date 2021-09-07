const {observable, autorun} = require("mobx");
const formRoot = observable({
    name: "MyType",
    fields: [
        {
            name: "id",
            type: "UUID",
            maxLength: 36,
            required: true,
            unique: false
        }, {
            name: "name",
            type: "STRING",
            maxLength: 100,
            required: true,
            unique: false
        }
    ],
    foreignKeys: [],
    uniqueConstraints: [],
    primaryKey: {
        fields: ["id"]
    }
});
autorun(() => console.log(JSON.stringify(formRoot, null, 4)))
