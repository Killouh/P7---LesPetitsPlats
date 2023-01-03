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


// DOM Ingrédients
const ingredientsDiv = document.querySelector(".advancedFilters-ingredients");
const ingredientsButton = document.querySelector(".advancedFilters-button-ingredients");
const ingredientsContainer = document.querySelector("#ingredients-lists");
const miniSearchContainerIngredients = document.getElementById("search-ingredients");
const ingredientsTag = document.getElementById("span-ingredients");
const ingredientsMenuArrow = document.querySelector(".menuArrow-ingredients");

// DOM Appareil
const appliancesDiv = document.querySelector(".advancedFilters-appliance");
const applianceButton = document.querySelector(".advancedFilters-button-appliance");
const applianceContainer = document.querySelector("#appliance-lists");
const miniSearchContainerAppliance = document.getElementById("search-appliance");
const applianceTag = document.getElementById("span-appliance");
const applianceMenuArrow = document.querySelector(".menuArrow-appliance");

// DOM Ustensiles
const ustensilsDiv = document.querySelector(".advancedFilters-ustensils");
const ustensilsButton = document.querySelector(".advancedFilters-button-ustensils");
const ustensilsContainer = document.querySelector("#ustensils-lists");
const miniSearchContainerUstensils = document.getElementById("search-ustensils");
const ustensilsTag = document.getElementById("span-ustensils");
const ustensilsMenuArrow = document.querySelector(".menuArrow-ustensils");


// Affiche le contenu du bouton Tagg
function displayButtonsContent(button, container, miniSearch, objectTag, objectDiv, arrow) {
    let cssVisibility = "visible";
    let cssDisplay = "block";

    document.addEventListener('click', () => {
        container.style.visibility = cssVisibility;
        miniSearch.style.visibility = cssVisibility;
        miniSearch.style.display = cssDisplay;
        arrow.style.transform = "rotate(0deg)";
        arrow.style.left = "20";
        arrow.style.right = "none";
        objectDiv.style.width = "80%";
        objectDiv.style.backgroundColor = "#3282f7";
        objectDiv.style.borderRadius = "20px"
        objectTag.style.display = "none"
        button.style.width = "100%"
    });
}
// Ferme le bouton tagg par clic hors de la zone ou sur la fleche
function hideMenuOnClick(container, miniSearch, objectTag, objectDiv, arrow) {
    let cssVisibility = "hidden";
    let cssDisplay = "none";

    document.addEventListener('click', event => {
        if (event.target !== objectDiv && !objectDiv.contains(event.target)) {

            container.style.visibility = cssVisibility;
            miniSearch.style.visibility = cssVisibility;
            miniSearch.style.display = cssDisplay;
            arrow.style.transform = "rotate(180deg)"
            objectDiv.style.width = "170px"
            objectDiv.style.backgroundcolor = "none"
            objectTag.style.display = "block"
        }
        if (event.target == arrow && arrow.contains(event.target)) {

            container.style.visibility = cssVisibility;
            miniSearch.style.visibility = cssVisibility;
            miniSearch.style.display = cssDisplay;
            arrow.style.transform = "rotate(180deg)"
            objectDiv.style.width = "170px"
            objectDiv.style.backgroundcolor = "none"
            objectTag.style.display = "block"
        }
    });
}




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
// const listTagg = document.querySelectorAll(".list"); à supprimmer
const taggsContainer = document.getElementById("advancedFilters-list")
const listTaggsIngredients = document.getElementById("ingredients-lists");
const listTaggsUstensils = document.getElementById("ustensils-lists");
const listTaggsAppliance = document.getElementById("appliance-lists");



function highlightTag(event) {
    if (event.target.classList.contains('List-data')) {
        const parentClass = event.target.parentNode.parentNode.classList.value;
        const selectedTaggdiv = document.createElement('div');
        const selecTaggButton = document.createElement('button');
        const selectedTaggCross = document.createElement('i');


        selectedTaggdiv.setAttribute('class', `Selected-Tagg-Container ${parentClass}`);

        selecTaggButton.setAttribute('type', `button`);
        selecTaggButton.setAttribute('class', `Selected-Tagg ${parentClass}`);

        selectedTaggCross.setAttribute('class', `fa-regular fa-circle-xmark Selected-Cross`);

        selecTaggButton.innerHTML += event.target.innerHTML;
        selectedTaggContainer.appendChild(selectedTaggdiv);
        selectedTaggdiv.appendChild(selecTaggButton);
        selectedTaggdiv.appendChild(selectedTaggCross);

        event.target.parentNode.parentNode.removeChild(event.target.parentNode);
    }


}

// Remet le tagg dans la liste au clic sur la croix
function removeHighlightedTag(event) {
    if (event.target) {
        if (event.target.classList.contains('Selected-Cross')) {
            const tag = event.target.parentNode;
            const previousDiv = event.target.previousSibling;
            const replacedListItem = document.createElement('li');
            const replacedButtonItem = document.createElement('button');

            if (tag.classList.contains('Selected-Tagg-Container')) {
                tag.parentNode.removeChild(tag);
                replacedListItem.setAttribute('class', `list`);
                replacedButtonItem.setAttribute('class', `List-data`);
                replacedButtonItem.setAttribute('type', `button`);
                replacedButtonItem.innerHTML += previousDiv.innerHTML;

                if (tag.classList.contains('ingredients-color')) {

                    listTaggsIngredients.appendChild(replacedListItem);
                }
                if (tag.classList.contains('ustensils-color')) {

                    listTaggsUstensils.appendChild(replacedListItem);
                }
                if (tag.classList.contains('appliance-color')) {

                    listTaggsAppliance.appendChild(replacedListItem);
                }
                replacedListItem.appendChild(replacedButtonItem);
            }
        }
    }

}
// Selectionne la list de tagg clické pour le remettre dans la list
selectedTaggContainer.addEventListener('click', removeHighlightedTag, true);
// Selectionne la liste de tagg pour en faire un bouton
taggsContainer.addEventListener('click', highlightTag, true);


// listTagg.forEach(tag => {
//     tag.addEventListener('click', highlightTag);
// });



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



