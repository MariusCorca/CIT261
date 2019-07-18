let temporaryRecipe = {
    "name": '',
    "ingredients": [],
    "description": ''
};

let temporaryMeal = {
    "dayOfWeek": '',
    "meal": ''
};

let currentTempMeals = [];

export default class mealModel {
    constructor (key) {
        this.key = key;
        this.items = readLS(this.key) || [];
        // console.log(window.localStorage);
    }

    // adds an item to the inventory
    add(item) {
        const newItem = {
            name: item.name,
            quantity: item.quantity
        };
        this.items.push(newItem);
        writeLS(this.key, this.items);
    }

    // deletes an item from the inventory
    delete(item) {
        deleteLS(this.key, item.name);
    }

    // edits an item at a specific position
    edit(item, position) {
        editLS(this.key, item, position);
    }

    // returns the current storage
    getItems() {
        return this.items;
    }

    // store temporary recipe name
    storeNewRecipeName(newRecipeName) {
        temporaryRecipe.name = newRecipeName;
    }

    // store temporary recipe description
    storeNewRecipeDescription(newRecipeDescription) {
        temporaryRecipe.description = newRecipeDescription;
    }

    // store temporary ingredients
    storeNewIngredientInTempRecipe(newTempIngredient) {
        temporaryRecipe.ingredients.push(newTempIngredient);
    }

    // returns the current temporary recipe
    getTemporaryRecipe() {
        return temporaryRecipe;
    }

    // delete an ingredient from the temporary recipe
    deleteTemporaryIndividualIngredient(position) {
        temporaryRecipe.ingredients.splice(position, 1);
    }

    // actually adds the recipe to the local storage
    addRecipe() {
        this.items.push(temporaryRecipe);
        writeLS(this.key, this.items);
        temporaryRecipe = {
            "name": '',
            "ingredients": [],
            "description": ''
        };
    }

    // delete a recipe from local storage
    deleteRecipe(recipeName) {
        deleteLS(this.key, recipeName);
    }

    // edit a recipe. This method receives an array of ingredient names and an array of ingredient quantities
    // in addition to tother paramaters. It first combines the ingredient names and quantities into one array, then
    // has it added to the local storage
    editRecipe(newRecipeName, newIngredientNames, newIngredientQuantities, newRecipeDescription, position) {
        // combine ingredient names and quantities together
        let newIngredients = [];
        let ingredient = {};

        for (let i = 0; i < newIngredientNames.length; i++) {
            ingredient = {
                'name': newIngredientNames[i],
                'quantity': newIngredientQuantities[i]
            }
            newIngredients.push(ingredient);
            ingredient = {};
        }

        editLSRecipe(this.key, newRecipeName, newIngredients, newRecipeDescription, position);
    }

    // stores the current meal temporarily
    storeCurrentMeal(meal, dayOfWeek) {
        let currentDay = '';
        switch(dayOfWeek) {
            case 0:
                currentDay = 'Monday';
                break;
            case 1:
                currentDay = 'Tuesday';
                break;
            case 2:
                currentDay = 'Wednesday';
                break;
            case 3:
                currentDay = 'Thursday';
                break;
            case 4:
                currentDay = 'Friday';
                break;
            case 5:
                currentDay = 'Saturday';
                break;
            case 6:
                currentDay = 'Sunday';
                break;
        }

        temporaryMeal.dayOfWeek = currentDay;
        temporaryMeal.meal = meal;

        // let currentMeals = this.items;
        // let currentMeals = [];
        currentTempMeals.push(temporaryMeal);

        // writeLS(this.key, currentMeals);

        temporaryMeal = {
            "dayOfWeek": '',
            "meal": ''
        };

        // console.log(currentTempMeals);
    }

    // stores the weekly meal in the local storage
    storeMeal() {
        // console.log(currentTempMeals);
        // deleteLS(this.key, currentTempMeals);
        localStorage.removeItem(this.key);
        writeLS(this.key, currentTempMeals);

        currentTempMeals = [];
    }

    // returns the current meal storage
    getMeals() {
        return readLS(this.key) || [];;
    }
}

// returns the local storage parsed
function readLS(key) {
    return JSON.parse(window.localStorage.getItem(key));
}

// stores in the local storage
function writeLS(key, items) {
    // console.log(items);
    window.localStorage.setItem(key, JSON.stringify(items));
    // const test = JSON.parse(window.localStorage.getItem(key));
    // console.log(test);
}

// deletes an item from local storage. Retrieves the ocal storage in an array, deletes the item from the array,
// clears the relevant local storage part and writes the new array to local storage
function deleteLS(key, item) {
    let currentStorage = readLS(key);
    console.log(currentStorage);
    let i = 0;
    for (i; i < currentStorage.length; i++) {
        if (currentStorage[i].name == item) {
            break;
        }
    }
    currentStorage.splice(i, 1);
    localStorage.removeItem(key);

    writeLS(key, currentStorage);
}

// edits an item in the local storage. If the item is found, it edits only the other parts of the item.
// If it is not, it deletes the item and adds a new one
function editLS(key, item, position) {
    let currentStorage = readLS(key);

    let found = 0
    let i = 0;
    for (i; i < currentStorage.length; i++) {
        if (currentStorage[i].name == item.name) {
            found = 1;
            break;
        }
    }

    if (found) {
        currentStorage[i].quantity = item.quantity;
    } else {
        currentStorage.splice(position, 1);
        currentStorage.push(item);
    }

    writeLS(key, currentStorage);
}

// edits a recipe in local storage. If the recipe is found, it edits only the other parts of the recipe.
// If it is not, it deletes the recipe and adds a new one
function editLSRecipe(key, newRecipeName, newIngredients, newRecipeDescription, position) {
    let currentStorage = readLS(key);

    let found = 0
    let i = 0;
    for (i; i < currentStorage.length; i++) {
        if (currentStorage[i].name == newRecipeName) {
            found = 1;
            break;
        }
    }

    if (found) {
        currentStorage[i].ingredients = newIngredients;
        currentStorage[i].description = newRecipeDescription;
    } else {
        currentStorage.splice(position, 1);
        let newRecipe = {
            "name": newRecipeName,
            "ingredients": newIngredients,
            "description": newRecipeDescription
        };
        currentStorage.push(newRecipe);
    }

    writeLS(key, currentStorage);
}