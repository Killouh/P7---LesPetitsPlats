import { recipes } from '../../data/recipes.js'
import { generateRecipeHTML } from './factories/recipesFactory.js'
import { createTagList, getListBlock, createTagListContent } from './factories/tagsFactory.js'




//DOM 
const recipeListDiv = document.getElementById("resultRecipes-container");
const recipeHTML = generateRecipeHTML(recipes);
const searchInput = document.querySelector('#searchBar');
const resultsContainer = document.querySelector('#resultRecipes-container');
const noResult = document.getElementById("noResults");
const miniSearchInput = document.querySelector('#search-ingredients');



// Genere les cartes de recettes
recipeListDiv.innerHTML += recipeHTML;



// Genere les boutons Tags

function displayListButtons(array) {

    const buttonsEntitled = createTagList(array);
    buttonsEntitled.forEach(element => getListBlock(element));

    return buttonsEntitled;
}

//Traduit les titre des tag généré en JS
function translatebuttons() {
    const ingredientsTag = document.getElementById("span-ingredients");
    const applianceTag = document.getElementById("span-appliance");
    const ustensusilsTag = document.getElementById("span-ustensils");
    const ingredientsSearchBar = document.getElementById("search-ingredients");
    const applianceSearchBar = document.getElementById("search-appliance");
    const ustensusilsSearchBar = document.getElementById("search-ustensils");

    if (ingredientsTag.textContent = "ingredients") {
        ingredientsTag.innerText = "Ingrédients";
    }
    if (applianceTag.textContent = "appliance") {
        applianceTag.innerText = "Appareil";
    }
    if (ustensusilsTag.textContent = "ustensils") {
        ustensusilsTag.innerText = "Ustensiles";
    }
    if (ingredientsSearchBar.placeholder = "Rechercher dans ingredients") {
        ingredientsSearchBar.placeholder = "Rechercher dans Ingrédients";
    }
    if (applianceSearchBar.placeholder = "Rechercher dans appliance") {
        applianceSearchBar.placeholder = "Rechercher dans Appareil";
    }
    if (ustensusilsSearchBar.placeholder = "Rechercher dans ustensils") {
        ustensusilsSearchBar.placeholder = "Rechercher dans Ustensiles";
    }
}



displayListButtons(recipes);
translatebuttons();


//Génère le contenu des boutons
function displayListContent() {
    const TagListContentObject = createTagListContent(recipes);

    // Génère le contenu du tagg ustensils
    const ustensilsObject = 'ustensilsTagHtml';
    const ustensilsTagHtmlDiv = document.getElementById("ustensils-lists");
    ustensilsTagHtmlDiv.innerHTML += TagListContentObject[ustensilsObject];

    // Génère le contenu du tag ingredient
    const ingredientsObject = 'ingredientsTagHtml';
    const ingredientsTagHtmlDiv = document.getElementById("ingredients-lists");
    ingredientsTagHtmlDiv.innerHTML += TagListContentObject[ingredientsObject];

    // génère le contenu du tagg appliance
    const applianceObject = 'applianceTagHtml';
    const applianceTagHtmlDiv = document.getElementById("appliance-lists");
    applianceTagHtmlDiv.innerHTML += TagListContentObject[applianceObject];
}
displayListContent();


// Ouverture et fermeture des menu tagg
const filtersDiv = document.querySelector(".advancedFilters");
const tagButton = document.querySelector(".advancedFilters-button");
const tagContainer = document.querySelector('[id*="-lists"]');
const miniSearchContainer = document.getElementById("search-ingredients");
const ingredientsTag = document.getElementById("span-ingredients");
const menuArrow = document.querySelector(".menuArrow");
// console.log(tagContainer);


// Voir pour simplement ajouter une classe "actif" // faire une fonction ?
function displayButtonsContent(button, container, miniSearch) {
    button.addEventListener('click', () => {
        let cssVisibility = "visible";
        let cssDisplay = "block";
        container.style.visibility = cssVisibility;
        miniSearch.style.visibility = cssVisibility;
        miniSearch.style.display = cssDisplay;
        menuArrow.style.transform = "rotate(0deg)";
        menuArrow.style.left = "20";
        menuArrow.style.right = "none";
        filtersDiv.style.width = "80%";
        filtersDiv.style.backgroundColor = "#3282f7";
        filtersDiv.style.borderRadius = "20px"
        ingredientsTag.style.display = "none"
        button.style.width = "100%"
    });
}
function hideMenuOnClick(button, container, miniSearch) {
    button.addEventListener('click', event => {
        // if (event.target !== button && !button.contains(event.target)) {
        //     let cssVisibility = "hidden";
        //     let cssDisplay ="none";
        //     container.style.visibility = cssVisibility;
        //     miniSearch.style.visibility = cssVisibility;
        //     miniSearch.style.display = cssDisplay;
        //     menuArrow.style.transform = "rotate(180deg)"
        //     filtersDiv.style.width = "170px"
        //     filtersDiv.style.backgroundcolor = "none"
        //     ingredientsTag.style.display ="block"

        // }
        if (event.target == menuArrow && menuArrow.contains(event.target)) {
            let cssVisibility = "hidden";
            let cssDisplay = "none";
            container.style.visibility = cssVisibility;
            miniSearch.style.visibility = cssVisibility;
            miniSearch.style.display = cssDisplay;
            menuArrow.style.transform = "rotate(180deg)"
            filtersDiv.style.width = "170px"
            filtersDiv.style.backgroundcolor = "none"
            ingredientsTag.style.display = "block"

        }
    });
}




displayButtonsContent(tagButton, tagContainer, miniSearchContainer, filtersDiv);
// ajouter pour appliance et ustensils
hideMenuOnClick(tagButton, tagContainer, miniSearchContainer);


// Clic sur un tagg pour l'ajouter/supprimer de la recherche
const selectedTaggContainer = document.getElementById("advancedSelectedFilterTags-container");
const listTagg = document.querySelector(".List-data");
const selectedTagg = document.querySelector(".Selected List-data");
const taggContainer = document.getElementById("ingredients-lists");


console.log(selectedTaggContainer);
console.log(selectedTagg);
console.log(tagButton);


function addTag(button, container) {
    button.addEventListener('click', () => {
        container.appendChild(button);
        button.setAttribute("class", "Selected-List-data");
    });
}

//  function removeTagg(button, container) {
//      button.addEventListener('click', () => {
//          button.appendChild(container);
//      });
//   }
addTag(listTagg, selectedTaggContainer);
// removeTagg(selectedTagg, taggContainer);

// Recherche via les tagg :


// Via la mini searchbar :

//function minisearchbar (searchbar, results){ // A adapter pour les tagg et voir apres pour partager avec searchbar
//}

//searchbar (miniSearchInput, resultsContainer,);




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

            console.log(searchTerm_normalized);
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



