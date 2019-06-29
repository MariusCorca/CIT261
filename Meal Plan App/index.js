import mealController from './MealController.js';

window.addEventListener('load', () => {
    //listItems();
    const appController = new mealController();
    appController.listItems();
});