import { recipes } from '../../data/recipes.js'
import { generateRecipeHTML } from './factories/recipesFactory.js'
import { createTagListContent, displayListButtons, highLightedTagg, modifyListContent, updateListDisplays, removeHighlightedTagg } from './factories/tagsFactory.js'
import { translatebuttons } from '../scripts/utils/localisation.js'
import { hideMenuOnClick, displayButtonsContent } from '../scripts/utils/display.js'



//DOM 
const recipeListDiv = document.getElementById("resultRecipes-container");
const recipeHTML = generateRecipeHTML(recipes);
const searchInput = document.querySelector('#searchBar');
const resultsContainer = document.querySelector('#resultRecipes-container');
const noResult = document.getElementById("noResults");



// Genere les cartes de recettes
recipeListDiv.innerHTML += recipeHTML;

// Genere les boutons Ingredient/Appareil/Ustensil
displayListButtons(recipes);

// Traduit les bouton Tagg
translatebuttons();

// //Génère le contenu des boutons
const list = createTagListContent(recipes);
let ustensilsArrayFinale = list.ustensilsArrayFinal;
let ingredientsArrayFinale = list.ingredientsArrayFinal;
let applianceArrayFinale = list.applianceArrayFinal;

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


// Clic sur un tagg pour l'ajouter/supprimer de la recherche
const selectedTaggContainer = document.getElementById("advancedSelectedFilterTags-container");
const taggsContainer = document.getElementById("advancedFilters-list")
const tagsButtons = document.querySelectorAll(".List-data");
const crossButtons = document.querySelectorAll("#Selected-Cross");

const listTaggsIngredients = document.getElementById("ingredients-lists");
const listTaggsUstensils = document.getElementById("ustensils-lists");
const listTaggsAppliance = document.getElementById("appliance-lists");


// Function qui ajoute un tagg en highlight
let highlightedItems = [];
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
            if (event.target.parentNode.parentNode.classList.contains('appliance-color')) {
                let index = arrayAppliance.indexOf(target.innerHTML);
                if (index !== -1) {
                    highlightedItems.push(arrayAppliance.splice(index, 1)[0]);
                    highLightedTagg(highlightedItems, ColorClass);
                }
            }
            if (event.target.parentNode.parentNode.classList.contains('ustensils-color')) {
                let index = arrayUstensils.indexOf(target.innerHTML);
                if (index !== -1) {
                    highlightedItems.push(arrayUstensils.splice(index, 1)[0]);
                    highLightedTagg(highlightedItems, ColorClass);
                }
            }
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
            if (target.parentNode.classList.contains("ingredients-color")) {
                ingredientsContainer.innerHTML = "";
                applianceContainer.innerHTML = "";
                ustensilsContainer.innerHTML = "";
            }
            removeHighlightedTagg(highlightedItems, target, ingredientsArrayFinale, applianceArrayFinale, ustensilsArrayFinale);
        }
    });
}

// Appel des functions de tagg
highlighManagement();
crossRemoval();





// Via la mini searchbar :

//function minisearchbar (searchbar, results){ // A adapter pour les tagg et voir apres pour partager avec searchbar
//}
// const ingre = "ingredients";
// const appl = "appliance";
// const usten = "ustensils";
// function minisearchbar(searchbar, resultsContainer, objects) {
//     searchbar.addEventListener('keyup', () => {
//         const searchTerm = searchbar.value.toLowerCase();
//         const TagListContentObject = createTagListContent(recipes);
//         const TaggListDiv = resultsContainer;


//         // Regles searchbar si saisie nulle ou < 3
//         if (searchTerm.length === 0) {
//             TaggListDiv.innerHTML += TagListContentObject[`${objects}TagHtml`];

//             return;
//         }

//         if (searchTerm.length < 3) {
//             TaggListDiv.innerHTML += TagListContentObject[`${objects}TagHtml`];
//             return;
//         }

// Recherche sur la searchbar pour les ingredients et les noms de plat //
// var searchTerm_normalized = searchTerm.normalize('NFD').replace(/\p{Diacritic}/gu, "");
// const buttonTexts = Array.from(arrayContent).map(button => button.innerText);
// const matchingRecipes = TagListContentObject[`${objects}TagHtml`] //{
// console.log(matchingRecipes);
// console.log(buttonTexts);

//     return recipe.ingredients.some((ingredient) => ingredient.ingredient.toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, "").includes(searchTerm_normalized));

// });
// console.log(matchingRecipes);


// resultsContainer.innerHTML = '';
// if (matchingRecipes.length > 0) {
//     for (const matchingRecipe of matchingRecipes) {
//         for(const ingredient of matchingRecipe.ingredients){
//         console.log(ingredient.ingredient);
//         TaggListDiv.innerHTML += ingredient.ingredient;
//         }
//     }
// }

//     });
// }
// minisearchbar(miniSearchInputIngredients, resultsContainerIngredients, ingre);
// minisearchbar(miniSearchInputAppliance, resultsContainerAppliance, appl);
// minisearchbar(miniSearchInputUstensils, resultsContainerUstensils, usten);


// Via l'ajout des tagg : 


// Searchbar 

function searchbar(searchbar, results, noResults) {
    searchbar.addEventListener('keyup', () => {
        const searchTerm = searchbar.value.toLowerCase();

        // Regles searchbar si saisie nulle ou < 3
        if (searchTerm.length === 0) {

            const recipeListDiv = document.getElementById("resultRecipes-container");
            const recipeHTML = generateRecipeHTML(recipes);
            recipeListDiv.innerHTML += recipeHTML;
            noResults.style.display = "none";
            return;
        }

        if (searchTerm.length < 3) {
            const recipeListDiv = document.getElementById("resultRecipes-container");
            const recipeHTML = generateRecipeHTML(recipes);
            recipeListDiv.innerHTML += recipeHTML;
            noResults.style.display = "none";
            return;
        }


        // Recherche sur la searchbar pour les ingredients et les noms de plat //

        var searchTerm_normalized = searchTerm.normalize('NFD').replace(/\p{Diacritic}/gu, "");
        const matchingRecipes = recipes.filter((recipe) => {

            return recipe.name.toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, "").includes(searchTerm_normalized) ||
                recipe.ingredients.some((ingredient) => ingredient.ingredient.toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, "").includes(searchTerm_normalized));

        });


        results.innerHTML = '';
        if (matchingRecipes.length > 0) {
            for (const recipe of matchingRecipes) {
                const recipeListDiv = document.getElementById("resultRecipes-container");
                const recipeHTML = generateRecipeHTML(matchingRecipes);
                recipeListDiv.innerHTML += recipeHTML;
                noResults.style.display = "none";

            }
        }

        if (matchingRecipes.length == 0) {

            noResults.style.display = "block";
        }
    });
}

searchbar(searchInput, resultsContainer, noResult);


// Croisement de toutes les recherches : 



