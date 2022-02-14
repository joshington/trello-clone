//Adding tasks is a bit more complex because they need to be added to specific lists
// tasks array. We’ll need to find the list by it’s id . Let’s add findItemIndexById
// method

interface Item {
    id:string
}

export const findItemById = <T extends Item>(items: T[], id:string) => {
    return items.findIndex((item:T) => item.id === id)
}
//now in above function we use generic type T that extends Item.that means that we have constrained
//our generic to have the fields that are defined on the Item interface.in this case the id field.