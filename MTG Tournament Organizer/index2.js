
// import createItem from './todoView.js';
// import {createItem, apiKey} from './todo.js';
import todoController from './todoController.js';

window.addEventListener('load', () => {
    const myTodoContoller = new todoController('todoList');
    myTodoContoller.addToDo();
    console.log(myTodoContoller);

    // const toDoListElements = document.getElementById("todolist");
    
    // toDoListElements.appendChild(createItem('teach class'));
});

