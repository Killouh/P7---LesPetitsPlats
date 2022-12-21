import { recipes } from '../../data/recipes.js'
import { generateRecipeHTML } from './factories/recipesFactory.js'




// Genere les cartes de recettes
const recipeListDiv = document.getElementById("resultRecipes-container");
const recipeHTML = generateRecipeHTML(recipes);
recipeListDiv.innerHTML += recipeHTML;



const searchInput = document.querySelector('#searchBar');
const resultsContainer = document.querySelector('#resultRecipes-container');
const noResult = document.getElementById("noResults");

// Revoir les normalize (voir note Fonction)
searchInput.addEventListener('keyup', () => {
    const searchTerm = searchInput.value.toLowerCase();
    

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





//   function searchRecipes(searchTerm) {
//     const normalizedSearchTerm = typeof searchTerm === 'string' ? searchTerm.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase() : searchTerm;
//     return recipes.filter(recipe => {
//       const nameMatch = typeof recipe.name === 'string' ? recipe.name.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase().includes(normalizedSearchTerm) : false;
//       const ingredients = recipe.ingredients.map(ingredient => typeof ingredient === 'string' ? ingredient.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase() : ingredient);
//       const ingredientMatch = ingredients.some(ingredient => ingredient.includes(normalizedSearchTerm));
//       return nameMatch || ingredientMatch;
//     });
//   }

//test à intégrer a la fonction recherche
    // var string_norm = string.normalize('NFD').replace(/\p{Diacritic}/gu, ""); 
    // console.log(string_norm);