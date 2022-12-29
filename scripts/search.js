import { recipes } from '../../data/recipes.js'
import { generateRecipeHTML } from './factories/recipesFactory.js'
import { createTagList, getListBlock, createTagListContent } from './factories/tagsFactory.js'




//DOM 
const recipeListDiv = document.getElementById("resultRecipes-container");
const recipeHTML = generateRecipeHTML(recipes);



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
    const ustensilsTagHtmlDiv = document.getElementById("ustensils-list");
    ustensilsTagHtmlDiv.innerHTML += TagListContentObject[ustensilsObject];

    // Génère le contenu du tag ingredient
    const ingredientsObject = 'ingredientsTagHtml';
    const ingredientsTagHtmlDiv = document.getElementById("ingredients-list");
    ingredientsTagHtmlDiv.innerHTML += TagListContentObject[ingredientsObject];

    // génère le contenu du tagg appliance
    const applianceObject = 'applianceTagHtml';
    const applianceTagHtmlDiv = document.getElementById("appliance-list");
    applianceTagHtmlDiv.innerHTML += TagListContentObject[applianceObject];
}
displayListContent();

const filtersDiv = document.querySelector(".advancedFilters");
const tagButton = document.querySelector(".advancedFilters-button");
const tagContainer = document.getElementById("ingredients-list");
const miniSearchContainer = document.getElementById("search-ingredients");
const ingredientsTag = document.getElementById("span-ingredients");
const menuArrow = document.querySelector(".menuArrow");

function displayButtonsContent(button, container,miniSearch) {
    button.addEventListener('click', () => {
        let cssVisibility = "visible";
        let cssDisplay ="block";
        container.style.visibility = cssVisibility;
        miniSearch.style.visibility = cssVisibility;
        miniSearch.style.display = cssDisplay;
        menuArrow.style.transform = "rotate(0deg)";
        menuArrow.style.left = "20";
        menuArrow.style.right = "none";
        filtersDiv.style.width = "80%";
        filtersDiv.style.backgroundColor = "#3282f7";
        ingredientsTag.style.display ="none"
        button.style.width = "100%"
    });
}
function hideMenuOnClick(button, container, miniSearch) {
    document.addEventListener('click', event => {
        if (event.target !== button && !button.contains(event.target)) {
            let cssVisibility = "hidden";
            let cssDisplay ="none";
            container.style.visibility = cssVisibility;
            miniSearch.style.visibility = cssVisibility;
            miniSearch.style.display = cssDisplay;
            menuArrow.style.transform = "rotate(180deg)"
            filtersDiv.style.width = "170px"
            filtersDiv.style.backgroundcolor = "none"
            ingredientsTag.style.display ="block"
            
        }
    });
}




displayButtonsContent(tagButton, tagContainer, miniSearchContainer,filtersDiv);
hideMenuOnClick(tagButton, tagContainer, miniSearchContainer);
console.log(tagButton);
console.log(tagContainer);





// Searchbar 
const searchInput = document.querySelector('#searchBar');
const resultsContainer = document.querySelector('#resultRecipes-container');
const noResult = document.getElementById("noResults");

searchInput.addEventListener('keyup', () => {
    const searchTerm = searchInput.value.toLowerCase();

    // Regles searchbar si saisie nulle ou < 3
    if (searchTerm.length === 0) {

        const recipeListDiv = document.getElementById("resultRecipes-container");
        const recipeHTML = generateRecipeHTML(recipes);
        recipeListDiv.innerHTML += recipeHTML;
        return;
    }

    if (searchTerm.length < 3) {
        const recipeListDiv = document.getElementById("resultRecipes-container");
        const recipeHTML = generateRecipeHTML(recipes);
        recipeListDiv.innerHTML += recipeHTML;
        noResult.style.display = "none";
        return;
    }


    // Recherche sur la searchbar pour les ingredients et les noms de plat //

    var searchTerm_normalized = searchTerm.normalize('NFD').replace(/\p{Diacritic}/gu, "");
    const matchingRecipes = recipes.filter((recipe) => {

        console.log(searchTerm_normalized);
        return recipe.name.toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, "").includes(searchTerm_normalized) ||
            recipe.ingredients.some((ingredient) => ingredient.ingredient.toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, "").includes(searchTerm_normalized));

    });


    resultsContainer.innerHTML = '';
    if (matchingRecipes.length > 0) {
        for (const recipe of matchingRecipes) {
            const recipeListDiv = document.getElementById("resultRecipes-container");
            const recipeHTML = generateRecipeHTML(matchingRecipes);
            recipeListDiv.innerHTML += recipeHTML;
            noResult.style.display = "none";

        }
    }

    if (matchingRecipes.length == 0) {

        noResult.style.display = "block";
    }
});



