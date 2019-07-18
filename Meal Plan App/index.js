import mealController from './MealController.js';

window.addEventListener('load', () => {
    //listItems();
    const fileName = location.href.split("/").slice(-1);
    // console.log(fileName);
    const appController = new mealController();

    // create event listeners for the inventory file
    if (fileName == "inventory.html") {
        appController.listItems();

        // add event listener for the Add item button
        let addItemButton = document.getElementById('addItemButton');
        addItemButton.addEventListener("touchend", function () {
            appController.addItem()
        });

        // add event listener for the + button
        document.addEventListener("touchend", function (addIndividualItemButton) {
            if (addIndividualItemButton.target && addIndividualItemButton.target.id == 'addIndividualItemButton') {
                appController.addIndividualItem();
            }
        });

        // add event listners for the delete buttons
        let deleteButtons = document.getElementsByClassName("deleteItemButtonClass");
        // console.dir(deleteButtons);

        for (let i = 0; i < deleteButtons.length; i++) {
            deleteButtons[i].addEventListener("touchend", function () {
                appController.deleteItem(i);
            });
        }

        // add event listeners for the edit buttons
        let editButtons = document.getElementsByClassName("editItemButtonClass");

        for (let i = 0; i < editButtons.length; i++) {
            editButtons[i].addEventListener("touchend", function () {
                appController.editItem(i);
            });
        }
    }

    // create event listeners for the recipes file
    if (fileName == "recipes.html") {
        appController.listRecipes();

        // add event listener for the Add Recipe button
        let addRecipeButton = document.getElementById('addRecipeButton');
        addRecipeButton.addEventListener("touchend", function () {
            appController.addRecipe();
        });

        // add event listener for the Add Ingredient button
        document.addEventListener("touchend", function (addTemporaryIngredientButton) {
            if (addTemporaryIngredientButton.target && addTemporaryIngredientButton.target.id == 'addIngredientButtonID') {
                appController.addTemporaryIngredient();
            }
        });

        // add event listener for the Add button (within the Add Ingredient section for adding a new Recipe)
        document.addEventListener("touchend", function (addTemporaryIndividualIngredientButton) {
            if (addTemporaryIndividualIngredientButton.target && addTemporaryIndividualIngredientButton.target.id == 'addIndividualIngredientButtonID') {
                appController.addTemporaryIndividualIngredient();
            }
        });

        // add event listener for the finish button (within the Add Ingredient section for adding a new Recipe)
        document.addEventListener("touchend", function (addIndividualRecipeButton) {
            if (addIndividualRecipeButton.target && addIndividualRecipeButton.target.id == 'addRecipeFinishButtonID') {
                appController.addIndividualRecipe();
            }
        });

        // add event listeners for all the Edit/Delete buttons
        let editDeleteButtons = document.getElementsByClassName("editDeleteRecipeButtonClass");
        // console.dir(editDeleteButtons);

        for (let i = 0; i < editDeleteButtons.length; i++) {
            editDeleteButtons[i].addEventListener("touchend", function () {
                appController.editDeleteRecipe(i);
            });
        }
    }
});