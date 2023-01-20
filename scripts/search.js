import { recipes } from '../../data/recipes.js'
import { generateRecipeHTML } from './factories/recipesFactory.js'
import { createTagListContent, displayListButtons, highLightedTagg, updateListDisplays, removeHighlightedTagg, searchIngredientTagg, searchApplianceTagg, searchUstensilsTagg } from './factories/tagsFactory.js'
import { translatebuttons } from '../scripts/utils/localisation.js'
import { hideMenuOnClick, displayButtonsContent } from '../scripts/utils/display.js'
import { minisearchbarIngredient, minisearchbarUstensils, minisearchbarAppliance, searchbar } from '../scripts/utils/searchBars.js'



//DOM 
const recipeListDiv = document.getElementById("resultRecipes-container");
const recipeHTML = generateRecipeHTML(recipes);
const searchInput = document.querySelector('#searchBar');
const resultsContainer = document.querySelector('#resultRecipes-container');
const noResult = document.getElementById("noResults");
export let highlightedItems = [];


// Genere les cartes de recettes
recipeListDiv.innerHTML += recipeHTML;

// Genere les boutons Ingredient/Appareil/Ustensil
displayListButtons(recipes);

// Traduit les bouton Tagg
translatebuttons();

// //Génère le contenu des boutons
const list = createTagListContent(recipes);
let ingredientsArrayFinale = list.ingredientsArrayFinal;
let applianceArrayFinale = list.applianceArrayFinal;
let ustensilsArrayFinale = list.ustensilsArrayFinal;

// DOM Ingrédients
const ingredientsDiv = document.querySelector(".advancedFilters-ingredients");
const ingredientsButton = document.querySelector(".advancedFilters-button-ingredients");
const ingredientsContainer = document.querySelector("#ingredients-lists");
const miniSearchContainerIngredients = document.getElementById("search-ingredients");
const ingredientsTag = document.getElementById("span-ingredients");
const ingredientsMenuArrow = document.querySelector(".menuArrow-ingredients");
const miniSearchInputIngredients = document.querySelector('#search-ingredients');
const resultsContainerIngredients = document.querySelector('#ingredients-lists');

// DOM Appareil
const appliancesDiv = document.querySelector(".advancedFilters-appliance");
const applianceButton = document.querySelector(".advancedFilters-button-appliance");
const applianceContainer = document.querySelector("#appliance-lists");
const miniSearchContainerAppliance = document.getElementById("search-appliance");
const applianceTag = document.getElementById("span-appliance");
const applianceMenuArrow = document.querySelector(".menuArrow-appliance");
const miniSearchInputAppliance = document.querySelector('#search-appliance');
const resultsContainerAppliance = document.querySelector('#appliance-lists');

// DOM Ustensiles
const ustensilsDiv = document.querySelector(".advancedFilters-ustensils");
const ustensilsButton = document.querySelector(".advancedFilters-button-ustensils");
const ustensilsContainer = document.querySelector("#ustensils-lists");
const miniSearchContainerUstensils = document.getElementById("search-ustensils");
const ustensilsTag = document.getElementById("span-ustensils");
const ustensilsMenuArrow = document.querySelector(".menuArrow-ustensils");
const miniSearchInputUstensils = document.querySelector('#search-ustensils');
const resultsContainerUstensils = document.querySelector('#ustensils-lists');

let compatibleRecipesFromTagg = recipes;
let compatibleRecipesFromSearch = recipes;


// Function ouverture par cas
displayButtonsContent(ingredientsButton, ingredientsContainer, miniSearchContainerIngredients, ingredientsTag, ingredientsDiv, ingredientsMenuArrow);
displayButtonsContent(applianceButton, applianceContainer, miniSearchContainerAppliance, applianceTag, appliancesDiv, applianceMenuArrow);
displayButtonsContent(ustensilsButton, ustensilsContainer, miniSearchContainerUstensils, ustensilsTag, ustensilsDiv, ustensilsMenuArrow);
//Function fermeture par cas
hideMenuOnClick(ingredientsContainer, miniSearchContainerIngredients, ingredientsTag, ingredientsDiv, ingredientsMenuArrow);
hideMenuOnClick(applianceContainer, miniSearchContainerAppliance, applianceTag, appliancesDiv, applianceMenuArrow);
hideMenuOnClick(ustensilsContainer, miniSearchContainerUstensils, ustensilsTag, ustensilsDiv, ustensilsMenuArrow);

// Function qui ajoute un tagg en highlight 

function updateTaggList(highlightedItems, recipes) {
    let highlightedItemsLowered = highlightedItems.map(item => item.toLowerCase());
    recipes = recipes.filter(recipe => {
        let ingredients = recipe.ingredients.map(ingredient => ingredient.ingredient.toLowerCase());
        let ustensils = recipe.ustensils.map(ustensil => ustensil.toLowerCase());
        let allItems = [...ingredients, recipe.appliance.toLowerCase(), ...ustensils];
        let intersection = highlightedItemsLowered.filter(item => allItems.includes(item));
        return intersection.length === highlightedItemsLowered.length;
    });
    ingredientsContainer.innerHTML = "";
    applianceContainer.innerHTML = "";
    ustensilsContainer.innerHTML = "";
    createTagListContent(recipes);
    return recipes;
}
// Recré les bonnes array lorsqu'on supprime un tagg choisi
function removeHighlightedItem(item, compatibleRecipesFromTagg, recipes, highlightedItems) {
    const itemTxt = [item.previousSibling.textContent];
    let highlightedItemsLowered = highlightedItems.map(item => item.toLowerCase());
    const filteredRecipes = recipes.filter(recipe => {
        let ingredients = recipe.ingredients.map(ingredient => ingredient.ingredient.toLowerCase());
        let ustensils = recipe.ustensils.map(ustensil => ustensil.toLowerCase());
        let allItems = [...ingredients, recipe.appliance.toLowerCase(), ...ustensils];
        return highlightedItemsLowered.every(item => allItems.includes(item));
    });
    const newRecipes = filteredRecipes.filter(recipe => !compatibleRecipesFromTagg.includes(recipe));
    console.log(newRecipes);
    compatibleRecipesFromTagg.push(...newRecipes);
}

// met en surbrillance un tagg cliqué
function highlighManagement() {
    document.addEventListener('click', function (event) {
        let target = event.target;
        if (target.matches(".List-data")) {
            let arrayIngredient = ingredientsArrayFinale;
            let arrayAppliance = applianceArrayFinale;
            let arrayUstensils = ustensilsArrayFinale;
            const ColorClass = event.target.parentNode.parentNode.classList;
            if (event.target.parentNode.parentNode.classList.contains('ingredients-color')) {
                let index = arrayIngredient.indexOf(target.innerHTML);
                if (index !== -1) {
                    highlightedItems.push(arrayIngredient.splice(index, 1)[0]);
                    highLightedTagg(highlightedItems, ColorClass);
                }
            }
            else if (event.target.parentNode.parentNode.classList.contains('appliance-color')) {
                let index = arrayAppliance.indexOf(target.innerHTML);
                if (index !== -1) {
                    highlightedItems.push(arrayAppliance.splice(index, 1)[0]);
                    highLightedTagg(highlightedItems, ColorClass);
                }
            }
            else if (event.target.parentNode.parentNode.classList.contains('ustensils-color')) {
                let index = arrayUstensils.indexOf(target.innerHTML);
                if (index !== -1) {
                    highlightedItems.push(arrayUstensils.splice(index, 1)[0]);
                    highLightedTagg(highlightedItems, ColorClass);
                }
            }
            compatibleRecipesFromTagg = updateTaggList(highlightedItems, compatibleRecipesFromTagg);
            updateListDisplays(target);
            resultsContainer.innerHTML = '';
            const recipeListDiv = document.getElementById("resultRecipes-container");
            const recipeHTML = generateRecipeHTML(compatibleRecipesFromTagg);
            recipeListDiv.innerHTML += recipeHTML;
            console.log(compatibleRecipesFromTagg);
            
        }
        crossedSearch();
    });


}

// Fonction qui enleve le tagg au clic de la croix 
function crossRemoval() {
    document.addEventListener("click", function (event) {
        let target = event.target;
        if (target.matches("#Selected-Cross")) {
            if (target.parentNode.classList.contains("ingredients-color")) {
                ingredientsContainer.innerHTML = "";
                applianceContainer.innerHTML = "";
                ustensilsContainer.innerHTML = "";
            }
            if (target.parentNode.classList.contains("appliance-color")) {
                ingredientsContainer.innerHTML = "";
                applianceContainer.innerHTML = "";
                ustensilsContainer.innerHTML = "";
            }
            if (target.parentNode.classList.contains("ustensils-color")) {
                ingredientsContainer.innerHTML = "";
                applianceContainer.innerHTML = "";
                ustensilsContainer.innerHTML = "";
            }
            removeHighlightedTagg(highlightedItems, target, ingredientsArrayFinale, applianceArrayFinale, ustensilsArrayFinale);
            removeHighlightedItem(target, compatibleRecipesFromTagg, recipes, highlightedItems);
            resultsContainer.innerHTML = '';
            const recipeListDiv = document.getElementById("resultRecipes-container");
            const recipeHTML = generateRecipeHTML(compatibleRecipesFromTagg);
            recipeListDiv.innerHTML += recipeHTML;
        }
    });
}

// Appel de la fonction searchBar Principale : 



// Appel des fonctions minisearchBars
minisearchbarIngredient(miniSearchInputIngredients, resultsContainerIngredients, ingredientsArrayFinale);
minisearchbarAppliance(miniSearchInputAppliance, resultsContainerAppliance, applianceArrayFinale);
minisearchbarUstensils(miniSearchInputUstensils, resultsContainerUstensils, ustensilsArrayFinale);


// Appel des functions de tagg
highlighManagement();
crossRemoval();

// Croisement des recherches :
function crossedSearch() {
    if (highlightedItems.length === 0) {
        console.log(compatibleRecipesFromSearch);
        searchbar(searchInput, resultsContainer, noResult, compatibleRecipesFromSearch);
        console.log("ok");
    }
    if (highlightedItems.length > 0) {
        console.log(compatibleRecipesFromTagg);
        searchbar(searchInput, resultsContainer, noResult, compatibleRecipesFromTagg);
    }
    if (searchInput.lenght > 0){
        
    }
}

crossedSearch();
