const inventory = [
    {
        name: 'Bread',
        quantity: 0
    },
    {
        name: 'Eggs',
        quantity: 0
    },
    {
        name: 'Corn',
        quantity: 0
    },
    {
        name: 'Milk',
        quantity: 0
    },
    {
        name: 'Cheese',
        quantity: 0
    },
    {
        name: 'Salt',
        quantity: 0
    },
    {
        name: 'Apples',
        quantity: 0
    }
];

export default class mealModel {
    constructor () {
        
    }

    getItems() {
        return inventory;
    }
}
