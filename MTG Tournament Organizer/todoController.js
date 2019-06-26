
import todoModel from './todoModel.js';

export default class todoController {
    constructor(elementID) {
        this.model = new todoModel('todo');
        this.element = document.getElementById(elementID);
    }

    addToDo() {
        this.model.add('Finish Class');
    }
}