import { observable, observe, isObservable } from "mobx"

const person = observable({
    firstName: "Maarten",
    lastName: "Luther"
})

const changes=[];

const disposer = observe(person, change => {
    console.log(change.type, change.name, "from", change.oldValue, "to", change.object[change.name])

    changes.push(change);
})

person.firstName = "Martin"
person.firstName = 144
// Prints: 'update firstName from Maarten to Martin'

disposer()
// Ignore any future updates

// observe a single field
const disposer2 = observe(person, "lastName", change => {
    console.log("LastName changed to ", change.newValue)
})


console.log(JSON.stringify(changes, null, 4))
console.log(isObservable(changes[0].object))
console.log(isObservable(changes[1].object === person))
