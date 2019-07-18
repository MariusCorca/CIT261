export default class mealView {
    constructor () {
        
    }

    renderItemHeading() {
        const heading = `
        <tr>
            <th class = "itemCol">Item</th>
            <th class = "quantityCol">Quantity</th>
            <th class = "editCol">Edit/Delete</th>
        </tr>`;

        return heading;
    }

    renderItem(item, IDcounter) {
        const element = document.createElement('tr');
        //element.style.cssText = 'text-align: center';
        element.innerHTML = `
        <td>${item.name}</td>
        <td>${item.quantity}</td>
        <td><button class = "editItemButtonClass" id = "editItem${IDcounter}">Edit</button> <button class = "deleteItemButtonClass" id = "removeItem${IDcounter}">Delete</button></td>
        `;
    
        return element;
    }

    renderAddItem() {
        const addItemRow = `
        <td>Item <input type='text' id='addIndividualItemName'></td>
        <td>Quantity <input type='text' id='addIndividualItemQuantity'></td>
        <td class='addItemCol'><button id = "addIndividualItemButton">+</button></td>
        `;

        return addItemRow;
    }

    renderEditItem(item) {
        const element = document.createElement('tr');
        element.innerHTML = `
        <td><input type='text' id='editedItemNameID' value='${item.name}'></td>
        <td><input type='text' id='editedItemQuantityID' value='${item.quantity}'></td>
        <td><button id='editedItemFinishID'>Finish</td>
        `;

        return element;
    }

    renderAddRecipe(temporaryRecipeName) {
        const tempRecipeTableHead = `
        <td>Recipe Name <input type='text' id='addRecipeName' value='${temporaryRecipeName}'></td>
        <td><button id='addIngredientButtonID'>Add Ingredient</td>
        <td><button id='addRecipeFinishButtonID'>Finish</td>
        `;

        return tempRecipeTableHead;
    }

    renderIndividualIngredient(ingredient, IDcounter) {
        // console.log('in render');
        const tempRecipeIngredient = document.createElement('tr');
        tempRecipeIngredient.innerHTML = `
        <td>${ingredient.name}</td>
        <td>${ingredient.quantity}</td>
        <td><button class = "removeTemporaryIndividualIngredientButtonClass" id='removeTemporaryIngredientButtonID${IDcounter}'>-</td>
        `;
        // console.log(tempRecipeIngredient);
        return tempRecipeIngredient;
    }

    renderAddRecipeIngredient() {
        const addRecipeIngredientRow = `
        <td>Ingredient <input type='text' id='addIndividualIngredientNameID'></td>
        <td>Quantity <input type='text' id='addIndividualIngredientQuantityID'></td>
        <td><button id='addIndividualIngredientButtonID'>Add</td>
        `;

        return addRecipeIngredientRow;
    }

    renderAddDescription(description) {
        const addDescription = `
        <td>Description</td>
        <td><textarea rows="5" cols="25" id = 'temporaryRecipeDescriptionID' placeholder='${description}'></textarea></td>
        <td>${description}</td>
        `;

        return addDescription;
    }

    renderRecipe(recipe, IDcounter) {
        let recipeTable = document.createElement('table');
        const lineBreak = document.createElement('br');

        let recipeTitle = document.createElement('tr');
        recipeTitle.innerHTML = `
        <td>${recipe.name}</td>
        <td><button class='editDeleteRecipeButtonClass' id='editDeleteRecipeButtonID${IDcounter}'>Edit/Delete</td>
        `;
        recipeTable.appendChild(recipeTitle);

        const recipeIngredients = recipe.ingredients;
        recipeIngredients.forEach(ingredient => {
            const ingredientRow = renderEachIngredient(ingredient);
            recipeTable.appendChild(ingredientRow);
        });

        let recipeDescription = document.createElement('tr');
        recipeDescription.innerHTML = `
        <td>Description</td>
        <td>${recipe.description}</td>
        `;

        recipeTable.appendChild(recipeDescription);

        recipeTable.appendChild(lineBreak);

        return recipeTable;
    }

    renderEditRecipe(recipe) {
        let recipeTable = document.createElement('table');
        const lineBreak = document.createElement("br");

        let recipeTitle = document.createElement('tr');
        recipeTitle.innerHTML = `
        <td><input type='text' id='editedRecipeNameID' value='${recipe.name}'</td>
        <td><button class='finishEditRecipeButtonClass' id='finishEditRecipeButtonID'>Finish <button class='deleteTheRecipeForGoodButtonClass' id='deleteTheRecipeForGoodButtonID'>Delete</td>
        `;
        recipeTable.appendChild(recipeTitle);

        let IDcounter = 0;
        const recipeIngredients = recipe.ingredients;
        recipeIngredients.forEach(ingredient => {
            IDcounter++;
            const ingredientRow = renderEachIngredientEdit(ingredient, IDcounter);
            recipeTable.appendChild(ingredientRow);
        });

        let recipeDescription = document.createElement('tr');
        recipeDescription.innerHTML = `
        <td>Current Description: ${recipe.description}</td>
        <td><textarea rows="5" cols="25" id = 'editRecipeDescriptionID' placeholder='${recipe.description}'</td>
        `;

        recipeTable.appendChild(recipeDescription);

        recipeTable.appendChild(lineBreak);

        return recipeTable;
    }
}

function renderEachIngredient(ingredient) {
    let recipeIngredient = document.createElement('tr');
    recipeIngredient.innerHTML = `
    <td>${ingredient.quantity}</td>
    <td>${ingredient.name}</td>
    `;

    return recipeIngredient;   
}

function renderEachIngredientEdit(ingredient, IDcounter) {
    let recipeIngredient = document.createElement('tr');
    recipeIngredient.innerHTML = `
    <td><input type='text' id='editedRecipeIngredientQuantityID${IDcounter}' value='${ingredient.quantity}'</td>
    <td><input type='text' id='editedRecipeIngredientNameID${IDcounter}' value='${ingredient.name}'</td>
    `;

    return recipeIngredient;   
}