import mealModel from './MealModel.js';
import mealView from './MealView.js';

export default class mealController {
    constructor () {
        this.modelItems = new mealModel('items');
        this.modelRecipes = new mealModel('recipes');
        this.view = new mealView();
    }

    listItems() {
        const inventory = this.modelItems.getItems();
        const listElement = document.getElementById('listInventory');

        // console.log(inventory);

        listElement.innerHTML = this.view.renderItemHeading();

        let IDcounter = 0; // used to provide a different ID for each button generated by renderItem

        inventory.forEach(item => {
            IDcounter++;
            const newItem = this.view.renderItem(item, IDcounter);
            listElement.appendChild(newItem);
        });
    }

    addItem() {
        const addItemBar = document.getElementById('addItemTable');
        addItemBar.innerHTML = '';

        const addItemBarRow = document.createElement('tr');
        addItemBarRow.innerHTML = this.view.renderAddItem();

        addItemBar.appendChild(addItemBarRow);
    }

    addIndividualItem() {
        let item = [];
        let itemName = document.getElementById('addIndividualItemName').value;
        let itemQuantity = document.getElementById('addIndividualItemQuantity').value;

        item.name = itemName;
        item.quantity = itemQuantity;

        this.modelItems.add(item);

        location.reload(); // refreshing the page because we need to re-add the event listeners for the new buttons
    }

    deleteItem(position) {
        const inventory = this.modelItems.getItems();
        this.modelItems.delete(inventory[position]);

        location.reload(); // refreshing the page because we need to re-add the event listeners for the new buttons
    }

    editItem(position) {
        const inventory = this.modelItems.getItems();

        // generate a new table
        const listElement = document.getElementById('listInventory');
        listElement.innerHTML = this.view.renderItemHeading();

        // list the items like normal up until our item to be edited
        let IDcounter = 0;
        let i = 0;
        for (i; i < position; i++) {
            IDcounter++;
            let newItem = this.view.renderItem(inventory[i], IDcounter);
            listElement.appendChild(newItem);
        }

        // list the current element with edit boxes
        let editedItem = this.view.renderEditItem(inventory[position])
        listElement.appendChild(editedItem);

        // finish displaying the rest of the table like normal
        IDcounter++;
        for (i++; i < inventory.length; i++) {
            IDcounter++;
            let newItem = this.view.renderItem(inventory[i], IDcounter);
            listElement.appendChild(newItem);
        }

        let modelItems = this.modelItems; // for some reason, i can not use this.modelItems in the if statement below. it says it's undefined so i defined it again here
        // add event listener for the Finish button
        document.addEventListener("touchend", function (finishEditItemButton) {
            if (finishEditItemButton.target && finishEditItemButton.target.id == 'editedItemFinishID') {
                const itemName = document.getElementById('editedItemNameID').value;
                const itemQuantity = document.getElementById('editedItemQuantityID').value;
                let itemTobeEdited = {name: itemName, quantity: itemQuantity};
                modelItems.edit(itemTobeEdited, position);

                location.reload();
            }
        });
    }

    listRecipes() {
        const inventory = this.modelRecipes.getItems();
        const listRecipes = document.getElementById('listRecipes');
        // const linebreak = document.createElement("br");

        // console.log(inventory);

        let IDcounter = 0;
        inventory.forEach(recipe => {
            IDcounter++;
            const newRecipe = this.view.renderRecipe(recipe, IDcounter);
            listRecipes.appendChild(newRecipe);
            // listRecipes.appendChild(linebreak);
        });
    }

    addRecipe() {
        const addRecipeTable = document.getElementById('addRecipeTable');
        addRecipeTable.innerHTML = '';

        const temporaryRecipe = this.modelRecipes.getTemporaryRecipe();

        const addRecipeTableHead = document.createElement('tr');
        addRecipeTableHead.innerHTML = this.view.renderAddRecipe(temporaryRecipe.name);
        addRecipeTable.appendChild(addRecipeTableHead);

        const temporaryRecipeIngredients = temporaryRecipe.ingredients;

        let IDCounter = 0;
        temporaryRecipeIngredients.forEach(ingredient => {
            IDCounter++;
            const newIngredient = this.view.renderIndividualIngredient(ingredient, IDCounter);
            addRecipeTable.appendChild(newIngredient);
        });

        const addRecipeDescription = document.createElement('tr');
        addRecipeDescription.innerHTML = this.view.renderAddDescription(temporaryRecipe.description);
        addRecipeTable.appendChild(addRecipeDescription);

        // add event listener for the - buttons (within the Add Ingredient section for adding a new Recipe)
        let removeTemporaryIngredientButtons = document.getElementsByClassName("removeTemporaryIndividualIngredientButtonClass");
        let self = this;
        for (let i = 0; i < removeTemporaryIngredientButtons.length; i++) {
            removeTemporaryIngredientButtons[i].addEventListener("touchend", function () {
                self.removeTemporaryIndividualIngredient(i);
            });
        }  
    }

    addTemporaryIngredient() {
        const newRecipeName = document.getElementById('addRecipeName').value;
        this.modelRecipes.storeNewRecipeName(newRecipeName);

        const newRecipeDescription = document.getElementById('temporaryRecipeDescriptionID').value;
        this.modelRecipes.storeNewRecipeDescription(newRecipeDescription);

        this.addRecipe(); // we're re-creating the table to avoid adding multiple empty ingredients rows
        const addRecipeTable = document.getElementById('addRecipeTable');

        const addRecipeIngredient = document.createElement('tr');
        addRecipeIngredient.innerHTML = this.view.renderAddRecipeIngredient();

        addRecipeTable.appendChild(addRecipeIngredient);
    }

    addTemporaryIndividualIngredient() {
        const newIngredientName = document.getElementById('addIndividualIngredientNameID').value;
        const newIngredientQuantity = document.getElementById('addIndividualIngredientQuantityID').value;

        const newIngredient = {
            name: newIngredientName,
            quantity: newIngredientQuantity
        };

        this.modelRecipes.storeNewIngredientInTempRecipe(newIngredient);

        this.addRecipe(); // we're re-drawing the current table 
    }

    removeTemporaryIndividualIngredient(position) {
        // console.log('test');
        this.modelRecipes.deleteTemporaryIndividualIngredient(position);

        this.addRecipe(); // we're re-drawing the current table
    }

    addIndividualRecipe() {
        const newRecipeDescription = document.getElementById('temporaryRecipeDescriptionID').value;
        this.modelRecipes.storeNewRecipeDescription(newRecipeDescription);
        this.modelRecipes.addRecipe();
        location.reload();
    }

    editDeleteRecipe(position) {
        // console.log(position);
        const recipes = this.modelRecipes.getItems();
        const recipeTables = document.getElementById('listRecipes');
        recipeTables.innerHTML = '';

        // generate tables like normal up until our current one
        let i = 0;
        let IDcounter = 0;
        for(i; i < position; i++) {
            IDcounter++;
            const newRecipe = this.view.renderRecipe(recipes[i], IDcounter);
            recipeTables.appendChild(newRecipe);
        }

        // generate our current recipe in edit mode
        let editedRecipe = this.view.renderEditRecipe(recipes[position]);
        recipeTables.appendChild(editedRecipe);

        // generate the rest of the table like normal
        IDcounter++;
        for (i++; i < recipes.length; i++) {
            IDcounter++;
            const newRecipe = this.view.renderRecipe(recipes[i], IDcounter);
            recipeTables.appendChild(newRecipe);
        }

        let self = this;

        // add event listener to the delete for good button
        document.addEventListener("touchend", function (deleteIndividualRecipeButton) {
            if (deleteIndividualRecipeButton.target && deleteIndividualRecipeButton.target.id == 'deleteTheRecipeForGoodButtonID') {
                const recipeName = document.getElementById('editedRecipeNameID').value;
                self.deleteRecipeForGood(recipeName);
            }
        });

        // add event listener to the Finish Editing button
        document.addEventListener("touchend", function (finishEditIndividualRecipeButton) {
            if (finishEditIndividualRecipeButton.target && finishEditIndividualRecipeButton.target.id == 'finishEditRecipeButtonID') {
                const recipeName = document.getElementById('editedRecipeNameID').value;
                self.finishEditRecipe(recipeName);
            }
        });

        // add event listeners for all the Edit/Delete buttons
        // let editDeleteButtons = document.getElementsByClassName("editDeleteRecipeButtonClass");

        // for (let i = 0; i < editDeleteButtons.length; i++) {
        //     editDeleteButtons[i].addEventListener("touchend", function () {
        //         self.editDeleteItem(i);
        //     });
        // }
    }

    deleteRecipeForGood(recipeName) {
        // console.log(recipeName);
        this.modelRecipes.deleteRecipe(recipeName);

        location.reload();
    }

    finishEditRecipe(recipeName) {
        this.modelRecipes.editRecipe(recipeName);

        location.reload();
    }
}

