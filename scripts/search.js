import { recipes } from '../../data/recipes.js'
import { createTagListContent, displayListButtons, highLightedTagg, updateListDisplays, removalTaggListRefresh } from './factories/tagsFactory.js'
import { translatebuttons } from '../scripts/utils/localisation.js'
import { hideMenuOnClick, displayButtonsContent, resetButtonContent, htmlRecipes } from '../scripts/utils/display.js'
import { minisearchbarIngredient, minisearchbarUstensils, minisearchbarAppliance, updateRecipes } from '../scripts/utils/searchBars.js'



//DOM 

let compatibleRecipesFromTagg = recipes;
let compatibleRecipesFromSearch = recipes;
let matchingRecipes = [];
const searchInput = document.querySelector('#searchBar');
const resultsContainer = document.querySelector('#resultRecipes-container');
const noResult = document.getElementById("noResults");
export let highlightedItems = [];
let searchTerm = "";
searchTerm = getSearchInputValue();

// Genere les cartes de recettes
htmlRecipes(compatibleRecipesFromTagg);

// Genere les boutons Ingredient/Appareil/Ustensil
displayListButtons(compatibleRecipesFromTagg);

// Traduit les bouton Tagg
translatebuttons();

// Génère le contenu des boutons
const list = createTagListContent(compatibleRecipesFromTagg);
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


// Function ouverture par cas
displayButtonsContent(ingredientsButton, ingredientsContainer, miniSearchContainerIngredients, ingredientsTag, ingredientsDiv, ingredientsMenuArrow);
displayButtonsContent(applianceButton, applianceContainer, miniSearchContainerAppliance, applianceTag, appliancesDiv, applianceMenuArrow);
displayButtonsContent(ustensilsButton, ustensilsContainer, miniSearchContainerUstensils, ustensilsTag, ustensilsDiv, ustensilsMenuArrow);
//Function fermeture par cas
hideMenuOnClick(ingredientsContainer, miniSearchContainerIngredients, ingredientsTag, ingredientsDiv, ingredientsMenuArrow);
hideMenuOnClick(applianceContainer, miniSearchContainerAppliance, applianceTag, appliancesDiv, applianceMenuArrow);
hideMenuOnClick(ustensilsContainer, miniSearchContainerUstensils, ustensilsTag, ustensilsDiv, ustensilsMenuArrow);


// Fourni la valeur de SearchTerm
function getSearchInputValue() {
    if (searchInput.value === "") {
        searchTerm = "";
    } else {
        searchInput.addEventListener('keyup', () => {
            searchTerm = searchInput.value.toLowerCase();
        });
    }
    return searchTerm;
}

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
    resetButtonContent();
    createTagListContent(recipes);
    return recipes;
}

// Recré les bonnes array lorsqu'on supprime un tagg choisi (met à jour compatibleRecipesFromTagg )
function removeHighlightedItem(compatibleRecipesFromTagg, recipes, highlightedItems) {
    let highlightedItemsLowered = highlightedItems.map(item => item.toLowerCase());
    const filteredRecipes = recipes.filter(recipe => {
        let ingredients = recipe.ingredients.map(ingredient => ingredient.ingredient.toLowerCase());
        let ustensils = recipe.ustensils.map(ustensil => ustensil.toLowerCase());
        let allItems = [...ingredients, recipe.appliance.toLowerCase(), ...ustensils];
        return highlightedItemsLowered.every(item => allItems.includes(item));
    });
    const newRecipes = filteredRecipes.filter(recipe => !compatibleRecipesFromTagg.includes(recipe));
    compatibleRecipesFromTagg.push(...newRecipes);
}

// Met en surbrillance un tagg cliqué
function highlightManagement() {

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
                    minisearchbarIngredient(miniSearchInputIngredients, resultsContainerIngredients, arrayIngredient);
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
            if (searchTerm.length === 0) {
                compatibleRecipesFromTagg = updateTaggList(highlightedItems, compatibleRecipesFromTagg);
                updateListDisplays(target);
                resultsContainer.innerHTML = '';
                htmlRecipes(compatibleRecipesFromTagg);
                searchCase();
            }
            if (searchTerm.length > 0) {
                compatibleRecipesFromTagg = updateTaggList(highlightedItems, compatibleRecipesFromTagg);
                matchingRecipes = compatibleRecipesFromTagg.filter(function (recipe) {
                    return matchingRecipes.indexOf(recipe) !== -1;
                });
                matchingRecipes = updateTaggList(highlightedItems, matchingRecipes);
                updateListDisplays(target);
                resultsContainer.innerHTML = '';
                htmlRecipes(matchingRecipes);
                searchCase();
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
                resetButtonContent();
            }
            if (target.parentNode.classList.contains("appliance-color")) {
                resetButtonContent();
            }
            if (target.parentNode.classList.contains("ustensils-color")) {
                resetButtonContent();
            }

            if (searchTerm.length === 0) {
                removalTaggListRefresh(highlightedItems, target, ingredientsArrayFinale, applianceArrayFinale, ustensilsArrayFinale);
                removeHighlightedItem(compatibleRecipesFromTagg, recipes, highlightedItems);
                updateTaggList(highlightedItems, compatibleRecipesFromTagg)
                resultsContainer.innerHTML = '';
                htmlRecipes(compatibleRecipesFromTagg);
            }
            if (searchTerm.length > 2) {
                removalTaggListRefresh(highlightedItems, target, ingredientsArrayFinale, applianceArrayFinale, ustensilsArrayFinale);
                removeHighlightedItem(compatibleRecipesFromTagg, recipes, highlightedItems);
                resultsContainer.innerHTML = '';
                updateTaggList(highlightedItems, matchingRecipes)
                updateRecipes(recipes, searchInput, searchTerm);
                htmlRecipes(updateRecipes(recipes, searchInput, searchTerm));
            }
            // Déplacer autre part que dans le cross
            if (searchTerm.length === 0 && highlightedItems.length === 0) {
                htmlRecipes(recipes);
            }
        }

    });

}


// Appel des fonctions minisearchBars
// minisearchbarIngredient(miniSearchInputIngredients, resultsContainerIngredients, ingredientsArrayFinale);
minisearchbarAppliance(miniSearchInputAppliance, resultsContainerAppliance, applianceArrayFinale);
minisearchbarUstensils(miniSearchInputUstensils, resultsContainerUstensils, ustensilsArrayFinale);

// Ecoute le clic sur les boutons des listes pour les highlight ensuite
highlightManagement();

// Ecoute le clic sur les croix des highlightedtaggs
crossRemoval();

// Fonction recherche adaptée en fonction de la situation
searchCase()

function searchbar(searchbar, results, noResults, compatibleRecipes) {
    searchbar.addEventListener('keyup', () => {
        let searchTerm = getSearchInputValue();
        searchTerm = searchbar.value.toLowerCase();

        // Regles searchbar si saisie nulle ou < 3
        if (searchTerm.length === 0 || searchTerm.length < 3 ) {
            updateTaggList(highlightedItems, compatibleRecipes)
            results.innerHTML = '';
            htmlRecipes(compatibleRecipes);
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
            htmlRecipes(matchingRecipes);
            noResults.style.display = "none";
        }

        if (matchingRecipes.length == 0) {
            noResults.style.display = "block";
        }
    });
}

// Croisement des recherches : // revoir trop a base d'array filtrée
// Croisement des recherches : // revoir trop a base d'array filtrée (rename la function)
function searchCase() { // voir ajout paramètre
    if (highlightedItems.length === 0) {


        searchbar(searchInput, resultsContainer, noResult, compatibleRecipesFromSearch);
        minisearchbarIngredient(miniSearchInputIngredients, resultsContainerIngredients, ingredientsArrayFinale, highlightedItems);
        minisearchbarAppliance(miniSearchInputAppliance, resultsContainerAppliance, applianceArrayFinale, highlightedItems);
        minisearchbarUstensils(miniSearchInputUstensils, resultsContainerUstensils, ustensilsArrayFinale, highlightedItems);

    }
    if (highlightedItems.length > 0) {
        searchbar(searchInput, resultsContainer, noResult, compatibleRecipesFromTagg);

        let ingredientsList = extractIngredients(compatibleRecipesFromTagg);
        let applianceList = extractAppliance(compatibleRecipesFromTagg);
        let ustensilsList = extractUstensils(compatibleRecipesFromTagg);

        minisearchbarIngredient(miniSearchInputIngredients, resultsContainerIngredients, ingredientsList, highlightedItems);
        minisearchbarAppliance(miniSearchInputAppliance, resultsContainerAppliance, applianceList, highlightedItems);
        minisearchbarUstensils(miniSearchInputUstensils, resultsContainerUstensils, ustensilsList, highlightedItems);

    }
}

function extractIngredients(compatibleRecipesFromTagg) {
    let ingredients = [];
    compatibleRecipesFromTagg.forEach(recipe => {
        recipe.ingredients.forEach(ingredient => {
            ingredients.push(ingredient.ingredient);
        });
    });
    return ingredients;
}

function extractUstensils(compatibleRecipesFromTagg) {
    let ustensils = [];
    compatibleRecipesFromTagg.forEach(recipe => {
        recipe.ustensils.forEach(ustensil => {
            ustensils.push(ustensil);
        });
    });
    return ustensils;
}

function extractAppliance(compatibleRecipesFromTagg) {
    let appliance = [];
    compatibleRecipesFromTagg.forEach(recipe => {
        appliance.push(recipe.appliance);
    });

    return appliance;
}