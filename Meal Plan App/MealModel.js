let temporaryRecipe = {
        "name": '',
        "ingredients": [],
        "description": ''
    };

export default class mealModel {
    constructor (key) {
        this.key = key;
        this.items = readLS(this.key) || [];
        // console.log(window.localStorage);
    }

    add(item) {
        // inventory.push(item);
        const newItem = {
            name: item.name,
            quantity: item.quantity
        };
        this.items.push(newItem);
        writeLS(this.key, this.items);
    }

    delete(item) {
        // console.log(item);
        deleteLS(this.key, item.name);
        // console.log(item.name);
    }

    edit(item, position) {
        editLS(this.key, item, position);
    }

    getItems() {
        // return inventory;
        return this.items;
    }

    storeNewRecipeName(newRecipeName) {
        temporaryRecipe.name = newRecipeName;
    }

    storeNewRecipeDescription(newRecipeDescription) {
        temporaryRecipe.description = newRecipeDescription;
    }

    storeNewIngredientInTempRecipe(newTempIngredient) {
        temporaryRecipe.ingredients.push(newTempIngredient);
        // console.log(temporaryRecipe);
    }

    getTemporaryRecipe() {
        return temporaryRecipe;
    }

    deleteTemporaryIndividualIngredient(position) {
        temporaryRecipe.ingredients.splice(position, 1);
    }

    addRecipe() {
        // let currentRecipes = readLS(this.key) || [];
        // currentRecipes.push(temporaryRecipe);
        this.items.push(temporaryRecipe);
        writeLS(this.key, this.items);
        temporaryRecipe = {
            "name": '',
            "ingredients": [],
            "description": ''
        };
    }

    deleteRecipe(recipeName) {
        // console.log(recipeName);
        deleteLS(this.key, recipeName);
    }

    editRecipe(recipeName) {
        editLSRecipe(this.key, recipeName);
    }
}

function readLS(key) {
    return JSON.parse(window.localStorage.getItem(key));
    //localStorage.clear();
}

function writeLS(key, items) {
    window.localStorage.setItem(key, JSON.stringify(items));
}

function deleteLS(key, item) {
    // window.localStorage.removeItem(key);
    // let currentStorage = JSON.parse(window.localStorage.getItem(key));
    // console.log(currentStorage);
    let currentStorage = readLS(key);
    console.log(currentStorage);
    let i = 0;
    for (i; i < currentStorage.length; i++) {
        if (currentStorage[i].name == item) {
            break;
        }
    }
    // console.log(i);
    currentStorage.splice(i, 1);
    // console.log(currentStorage);
    // localStorage.clear();
    localStorage.removeItem(key);

    writeLS(key, currentStorage);
}

function editLS(key, item, position) {
    // console.log(item);
    // console.log(position);
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
        // console.log('found!');
        currentStorage[i].quantity = item.quantity;
        // console.log(currentStorage[i].quantity);
        // console.log(item.quantity);
    } else {
        // console.log('not found!');
        currentStorage.splice(position, 1);
        currentStorage.push(item);
    }

    writeLS(key, currentStorage);
}

function editLSRecipe(key, recipeName) {
    let currentStorage = readLS(key);

    let found = 0
    let i = 0;
    for (i; i < currentStorage.length; i++) {
        if (currentStorage[i].name == recipeName) {
            found = 1;
            break;
        }
    }

    if (found) {
        // console.log('found');
    }
}