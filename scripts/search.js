import { recipes } from '../../data/recipes.js'
import { generateRecipeHTML } from './factories/recipesFactory.js'
import { createTagListContent, displayListButtons, highLightedTagg, modifyListContent, updateListDisplays, removeHighlightedTagg, searchIngredientTagg, searchApplianceTagg, searchUstensilsTagg } from './factories/tagsFactory.js'
import { translatebuttons } from '../scripts/utils/localisation.js'
import { hideMenuOnClick, displayButtonsContent } from '../scripts/utils/display.js'



//DOM 
const recipeListDiv = document.getElementById("resultRecipes-container");
const recipeHTML = generateRecipeHTML(recipes);
const searchInput = document.querySelector('#searchBar');
const resultsContainer = document.querySelector('#resultRecipes-container');
const noResult = document.getElementById("noResults");
export let highlightedItems = [];
let compatibleRecipes = recipes;


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

// Function ouverture par cas
displayButtonsContent(ingredientsButton, ingredientsContainer, miniSearchContainerIngredients, ingredientsTag, ingredientsDiv, ingredientsMenuArrow);
displayButtonsContent(applianceButton, applianceContainer, miniSearchContainerAppliance, applianceTag, appliancesDiv, applianceMenuArrow);
displayButtonsContent(ustensilsButton, ustensilsContainer, miniSearchContainerUstensils, ustensilsTag, ustensilsDiv, ustensilsMenuArrow);
//Function fermeture par cas
hideMenuOnClick(ingredientsContainer, miniSearchContainerIngredients, ingredientsTag, ingredientsDiv, ingredientsMenuArrow);
hideMenuOnClick(applianceContainer, miniSearchContainerAppliance, applianceTag, appliancesDiv, applianceMenuArrow);
hideMenuOnClick(ustensilsContainer, miniSearchContainerUstensils, ustensilsTag, ustensilsDiv, ustensilsMenuArrow);

// Function qui ajoute un tagg en highlight

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
            updateTaggList(highlightedItems, compatibleRecipes)
            updateListDisplays(target);
        }
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
        }
    });
}


// Via la mini searchbar :


// A optimiser pour une fonction unique // Pas necessaire (pas forcemment mieux)
function minisearchbarIngredient(searchbar, resultsContainer, array) {
    searchbar.addEventListener('keyup', () => {
        const searchTerm = searchbar.value.toLowerCase();

        // Regles searchbar si saisie nulle ou < 3
        if (searchTerm.length === 0) {
            resultsContainer.innerHTML = '';
            searchIngredientTagg(array);

            return;
        }

        if (searchTerm.length < 3) {
            resultsContainer.innerHTML = '';
            searchIngredientTagg(array);
            return;
        }

        // Recherche sur la searchbar pour les ingredients et les noms de plat //
        var searchTerm_normalized = searchTerm.normalize('NFD').replace(/\p{Diacritic}/gu, "");
        const matchingRecipes = array.filter((item) => {
            return item.toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, "").includes(searchTerm_normalized)
        });
        console.log(matchingRecipes);

        resultsContainer.innerHTML = '';

        if (matchingRecipes.length > 0) {
            searchIngredientTagg(matchingRecipes);
        }
    });
};

function minisearchbarAppliance(searchbar, resultsContainer, array) {
    searchbar.addEventListener('keyup', () => {
        const searchTerm = searchbar.value.toLowerCase();

        // Regles searchbar si saisie nulle ou < 3
        if (searchTerm.length === 0) {
            searchApplianceTagg(array);

            return;
        }

        if (searchTerm.length < 3) {
            resultsContainer.innerHTML = '';
            searchApplianceTagg(array);

            return;
        }

        // Recherche sur la searchbar pour les ingredients et les noms de plat //
        var searchTerm_normalized = searchTerm.normalize('NFD').replace(/\p{Diacritic}/gu, "");
        const matchingRecipes = array.filter((item) => {
            return item.toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, "").includes(searchTerm_normalized)
        });
        console.log(matchingRecipes);

        resultsContainer.innerHTML = '';

        if (matchingRecipes.length > 0) {
            searchApplianceTagg(matchingRecipes);
        }
    });
};

function minisearchbarUstensils(searchbar, resultsContainer, array) {
    searchbar.addEventListener('keyup', () => {
        const searchTerm = searchbar.value.toLowerCase();

        // Regles searchbar si saisie nulle ou < 3
        if (searchTerm.length === 0) {
            resultsContainer.innerHTML = '';
            searchUstensilsTagg(array);

            return;
        }

        if (searchTerm.length < 3) {
            resultsContainer.innerHTML = '';
            searchUstensilsTagg(array);

            return;
        }

        // Recherche sur la searchbar pour les ingredients et les noms de plat //
        var searchTerm_normalized = searchTerm.normalize('NFD').replace(/\p{Diacritic}/gu, "");
        const matchingRecipes = array.filter((item) => {
            return item.toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, "").includes(searchTerm_normalized)
        });
        console.log(matchingRecipes);

        resultsContainer.innerHTML = '';

        if (matchingRecipes.length > 0) {
            searchUstensilsTagg(matchingRecipes);
        }
    });
};

minisearchbarIngredient(miniSearchInputIngredients, resultsContainerIngredients, ingredientsArrayFinale);
minisearchbarAppliance(miniSearchInputAppliance, resultsContainerAppliance, applianceArrayFinale);
minisearchbarUstensils(miniSearchInputUstensils, resultsContainerUstensils, ustensilsArrayFinale);


// displayAvailableIngredients(recette) => app/uste...
//Recette ou recette filtrée en paramètre

// filtrer les recette par ingredient/app/uste...


// partir de zero(a voir) pour une supression filtre/tagg



// Via l'ajout des tagg (Vérifie les recettes contenant ce tagg et affiche les seuls tagg restants et compatibles)

// voir rename fonction / + gerer les recettes affichées en meme temps dans un premier temps // voir sans accolade


function updateTaggList(highlightedItems, compatibleRecipes) {
    let highlightedItemsLowered = highlightedItems.map(function (item) {
        return item.toLowerCase()
    });
    compatibleRecipes = compatibleRecipes.filter(recipe => {
        return recipe.ingredients.some(ingredient => highlightedItemsLowered.includes(ingredient.ingredient.toLowerCase())) ||
            highlightedItemsLowered.includes(recipe.appliance.toLowerCase()) ||
            recipe.ustensils.some(ustensils => highlightedItemsLowered.includes(ustensils.toLowerCase()))
    });


    ingredientsContainer.innerHTML = "";
    applianceContainer.innerHTML = "";
    ustensilsContainer.innerHTML = "";
    
    createTagListContent(compatibleRecipes);
    console.log(highlightedItems);
    console.log(compatibleRecipes);
    return compatibleRecipes;
}

// Searchbar 

function searchbar(searchbar, results, noResults) {
    searchbar.addEventListener('keyup', () => {
        const searchTerm = searchbar.value.toLowerCase();
        const recipeListDiv = document.getElementById("resultRecipes-container");
        const recipeHTML = generateRecipeHTML(recipes);

        // Regles searchbar si saisie nulle ou < 3
        if (searchTerm.length === 0) {
            recipeListDiv.innerHTML += recipeHTML;
            noResults.style.display = "none";
            return;
        }

        if (searchTerm.length < 3) {

            recipeListDiv.innerHTML += recipeHTML;
            noResults.style.display = "none";
            return;
        }


        // Recherche sur la searchbar pour les ingredients , les noms de plat et la description 

        var searchTerm_normalized = searchTerm.normalize('NFD').replace(/\p{Diacritic}/gu, "");
        const matchingRecipes = recipes.filter((recipe) => {

            return recipe.name.toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, "").includes(searchTerm_normalized) ||
                recipe.ingredients.some((ingredient) => ingredient.ingredient.toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, "").includes(searchTerm_normalized)) ||
                recipe.description.toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, "").includes(searchTerm_normalized);

        });


        results.innerHTML = '';
        if (matchingRecipes.length > 0) {
            const recipeHTML = generateRecipeHTML(matchingRecipes);
            recipeListDiv.innerHTML += recipeHTML;
            noResults.style.display = "none";
        }

        if (matchingRecipes.length == 0) {

            noResults.style.display = "block";
        }
    });
}

searchbar(searchInput, resultsContainer, noResult);


// Croisement de toutes les recherches : 




// Appel des functions de tagg
highlighManagement();
crossRemoval();
