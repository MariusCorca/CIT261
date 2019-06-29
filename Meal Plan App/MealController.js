import mealModel from './MealModel.js';
import mealView from './MealView.js';

export default class mealController {
    constructor () {
        this.model = new mealModel();
    }


    listItems() {
        const inventory = this.model.getItems();
        const listElement = document.getElementById('listHome');
    
        //console.dir(listElement);
        listElement.innerHTML = '';
        inventory.forEach(item => {
            const newItem = renderItem(item);
            listElement.appendChild(newItem);
        });
    }
}

function renderItem(item) {
    const element = document.createElement('li');
    element.innerHTML = `
    <p>Name: ${item.name}</p>
    <p>Quantity: ${item.quantity}</p>
    `;

    return element;
}