import { recipes } from '../../data/recipes.js'
import { generateRecipeHTML } from './factories/recipesFactory.js'
import { createTagListContent, displayListButtons, highLightedTagg, updateListDisplays, removeHighlightedTagg, searchIngredientTagg, searchApplianceTagg, searchUstensilsTagg } from './factories/tagsFactory.js'
import { translatebuttons } from '../scripts/utils/localisation.js'
import { hideMenuOnClick, displayButtonsContent } from '../scripts/utils/display.js'
import { minisearchbarIngredient, minisearchbarUstensils, minisearchbarAppliance } from '../scripts/utils/searchBars.js'



//DOM 
const recipeListDiv = document.getElementById("resultRecipes-container");
const recipeHTML = generateRecipeHTML(recipes);
const searchInput = document.querySelector('#searchBar');
const resultsContainer = document.querySelector('#resultRecipes-container');
const noResult = document.getElementById("noResults");
export let highlightedItems = [];
let searchTerm;



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
export const ingredientsContainer = document.querySelector("#ingredients-lists");
const miniSearchContainerIngredients = document.getElementById("search-ingredients");
const ingredientsTag = document.getElementById("span-ingredients");
const ingredientsMenuArrow = document.querySelector(".menuArrow-ingredients");
const miniSearchInputIngredients = document.querySelector('#search-ingredients');
const resultsContainerIngredients = document.querySelector('#ingredients-lists');

// DOM Appareil
const appliancesDiv = document.querySelector(".advancedFilters-appliance");
const applianceButton = document.querySelector(".advancedFilters-button-appliance");
export const applianceContainer = document.querySelector("#appliance-lists");
const miniSearchContainerAppliance = document.getElementById("search-appliance");
const applianceTag = document.getElementById("span-appliance");
const applianceMenuArrow = document.querySelector(".menuArrow-appliance");
const miniSearchInputAppliance = document.querySelector('#search-appliance');
const resultsContainerAppliance = document.querySelector('#appliance-lists');

// DOM Ustensiles
const ustensilsDiv = document.querySelector(".advancedFilters-ustensils");
const ustensilsButton = document.querySelector(".advancedFilters-button-ustensils");
export const ustensilsContainer = document.querySelector("#ustensils-lists");
const miniSearchContainerUstensils = document.getElementById("search-ustensils");
const ustensilsTag = document.getElementById("span-ustensils");
const ustensilsMenuArrow = document.querySelector(".menuArrow-ustensils");
const miniSearchInputUstensils = document.querySelector('#search-ustensils');
const resultsContainerUstensils = document.querySelector('#ustensils-lists');

let compatibleRecipesFromTagg = recipes;
let compatibleRecipesFromSearch = recipes;
let matchingRecipes = [];


// Function ouverture par cas
displayButtonsContent(ingredientsButton, ingredientsContainer, miniSearchContainerIngredients, ingredientsTag, ingredientsDiv, ingredientsMenuArrow);
displayButtonsContent(applianceButton, applianceContainer, miniSearchContainerAppliance, applianceTag, appliancesDiv, applianceMenuArrow);
displayButtonsContent(ustensilsButton, ustensilsContainer, miniSearchContainerUstensils, ustensilsTag, ustensilsDiv, ustensilsMenuArrow);
//Function fermeture par cas
hideMenuOnClick(ingredientsContainer, miniSearchContainerIngredients, ingredientsTag, ingredientsDiv, ingredientsMenuArrow);
hideMenuOnClick(applianceContainer, miniSearchContainerAppliance, applianceTag, appliancesDiv, applianceMenuArrow);
hideMenuOnClick(ustensilsContainer, miniSearchContainerUstensils, ustensilsTag, ustensilsDiv, ustensilsMenuArrow);

// Fonction recherche adaptée en fonction de la situation
crossedSearch()

// Function qui ajoute un tagg en highlight 

export function updateTaggList(highlightedItems, recipes) {
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
        searchTerm = getSearchInputValue();

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
            if (searchTerm === undefined || searchTerm.length === 0) {
                compatibleRecipesFromTagg = updateTaggList(highlightedItems, compatibleRecipesFromTagg);
                updateListDisplays(target);
                resultsContainer.innerHTML = '';
                const recipeListDiv = document.getElementById("resultRecipes-container");
                const recipeHTML = generateRecipeHTML(compatibleRecipesFromTagg);
                recipeListDiv.innerHTML += recipeHTML;
                console.log("test1");
                crossedSearch();
            }
            if (searchTerm.length > 0) {
                console.log(searchTerm.length);
                compatibleRecipesFromTagg = updateTaggList(highlightedItems, compatibleRecipesFromTagg);
                console.log(compatibleRecipesFromTagg);
                matchingRecipes = compatibleRecipesFromTagg.filter(function (recipe) {
                    return matchingRecipes.indexOf(recipe) !== -1;
                });
                matchingRecipes = updateTaggList(highlightedItems, matchingRecipes);
                updateListDisplays(target);
                resultsContainer.innerHTML = '';
                const recipeListDiv = document.getElementById("resultRecipes-container");
                const recipeHTML = generateRecipeHTML(matchingRecipes);
                recipeListDiv.innerHTML += recipeHTML;
                console.log("test1");
            }


        }

    });

}

// Fonction qui enleve le tagg au clic de la croix 
function crossRemoval() {
    document.addEventListener("click", function (event) {
        searchTerm = getSearchInputValue();
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

            if (searchTerm === undefined || searchTerm.length === 0 ) {
                removeHighlightedTagg(highlightedItems, target, ingredientsArrayFinale, applianceArrayFinale, ustensilsArrayFinale);
                removeHighlightedItem(target, compatibleRecipesFromTagg, recipes, highlightedItems);
                resultsContainer.innerHTML = '';
                const recipeListDiv = document.getElementById("resultRecipes-container");
                console.log(matchingRecipes);
                const recipeHTML = generateRecipeHTML(compatibleRecipesFromTagg);
                recipeListDiv.innerHTML += recipeHTML;
                console.log("ok");
                console.log(matchingRecipes);
            }
            if (searchTerm.length > 0) {
                removeHighlightedTagg(highlightedItems, target, ingredientsArrayFinale, applianceArrayFinale, ustensilsArrayFinale);
                removeHighlightedItem(target, compatibleRecipesFromTagg, recipes, highlightedItems);
                resultsContainer.innerHTML = '';
                const recipeListDiv = document.getElementById("resultRecipes-container");
                console.log(searchTerm);
                const recipeHTML = generateRecipeHTML(compatibleRecipesFromTagg);
                recipeListDiv.innerHTML += recipeHTML;
                console.log("ok2");
            }
        }
    });
}

// Appel de la fonction searchBar Principale : 



// Appel des fonctions minisearchBars
minisearchbarIngredient(miniSearchInputIngredients, resultsContainerIngredients, ingredientsArrayFinale);
minisearchbarAppliance(miniSearchInputAppliance, resultsContainerAppliance, applianceArrayFinale);
minisearchbarUstensils(miniSearchInputUstensils, resultsContainerUstensils, ustensilsArrayFinale);


// Appel des functions de tagg
function getSearchInputValue(){
searchInput.addEventListener('keyup', () => {
    searchTerm = searchInput.value.toLowerCase();})
    return searchTerm
}

highlighManagement();
crossRemoval();

// Croisement des recherches :
function crossedSearch() {
    // searchInput.addEventListener('keyup', () => {
    // searchTerm = searchInput.value.toLowerCase();
    if (highlightedItems.length === 0) {
        searchbar(searchInput, resultsContainer, noResult, compatibleRecipesFromSearch);
    }
    if (highlightedItems.length > 0) {
        searchbar(searchInput, resultsContainer, noResult, compatibleRecipesFromTagg);
    }
    //  if (highlightedItems.length > 0 && searchTerm.length > 0) {
    //      searchbar(searchInput, resultsContainer, noResult, matchingRecipes);
    //      console.log(matchingRecipes);
    //      console.log(searchTerm.length);
    //      console.log("ok")
    //  }
// });
}






function searchbar(searchbar, results, noResults, compatibleRecipes) {
    searchbar.addEventListener('keyup', () => {
        searchTerm = searchbar.value.toLowerCase();
        const recipeListDiv = document.getElementById("resultRecipes-container");

        // Regles searchbar si saisie nulle ou < 3
        if (searchTerm.length === 0) {
            results.innerHTML = '';
            const recipeHTML = generateRecipeHTML(compatibleRecipes);
            recipeListDiv.innerHTML += recipeHTML;
            noResults.style.display = "none";
            return;
        }

        if (searchTerm.length < 3) {
            results.innerHTML = '';
            const recipeHTML = generateRecipeHTML(compatibleRecipes);
            recipeListDiv.innerHTML += recipeHTML;
            noResults.style.display = "none";
            return;
        }


        // Recherche sur la searchbar pour les ingredients , les noms de plat et la description 

        var searchTerm_normalized = searchTerm.normalize('NFD').replace(/\p{Diacritic}/gu, "");
        matchingRecipes = compatibleRecipes.filter((recipe) => {

            return recipe.name.toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, "").includes(searchTerm_normalized) ||
                recipe.ingredients.some((ingredient) => ingredient.ingredient.toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, "").includes(searchTerm_normalized)) ||
                recipe.description.toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, "").includes(searchTerm_normalized);

        });
        results.innerHTML = '';

        if (matchingRecipes.length > 0) {
            ingredientsContainer.innerHTML = "";
            applianceContainer.innerHTML = "";
            ustensilsContainer.innerHTML = "";
            updateTaggList(highlightedItems, matchingRecipes)
            const recipeHTML = generateRecipeHTML(matchingRecipes);
            recipeListDiv.innerHTML += recipeHTML;
            noResults.style.display = "none";
        }

        if (matchingRecipes.length == 0) {
            noResults.style.display = "block";

        }
        console.log(getSearchInputValue());
    });

}
