
export default class todoModel {
    constructor (key) {
        this.key = key;
        this.toDos = readLS(this.key) || []; // if there is no lost in LS then set it to an empty array
    }

    add(data) {
        const newToDo = {
            id: new Date(),
            content: data,
            completed: false
        };
        this.toDos.push(newToDo);
        writeLS(this.key, this.toDos);
    }
    delete(id) {}
    getItems() {}
    getFilteredItems(query) {}
    complete(id) {}
}

// these two functions are private
function readLS(key) {
    return JSON.parse(window.localStorage.getItem(key));
}
function writeLS(key, toDos) {
    window.localStorage.setItem(key, JSON.stringify(toDos));
}