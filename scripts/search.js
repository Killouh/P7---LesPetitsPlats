import { recipes } from '../../data/recipes.js'
import { generateRecipeHTML } from './factories/recipesFactory.js'

// Genere les cartes de recettes
const recipeListDiv = document.getElementById("resultRecipes-container");
const recipeHTML = generateRecipeHTML(recipes);
recipeListDiv.innerHTML += recipeHTML;



const searchInput = document.querySelector('#searchBar');
const resultsContainer = document.querySelector('#resultRecipes-container');
const noResult = document.getElementById("noResults");

searchInput.addEventListener('keyup', () => {
    const searchTerm = searchInput.value.toLowerCase().normalize('NFD');
    


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

    const matchingRecipes = searchRecipes(searchTerm);

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



function searchRecipes(searchTerm) {
    const normalizedSearchTerm = typeof searchTerm === 'string' ? searchTerm.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase() : searchTerm;
    return recipes.filter(recipe => {
      const nameMatch = typeof recipe.name === 'string' ? recipe.name.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase().includes(normalizedSearchTerm) : false;
      const ingredients = recipe.ingredients.map(ingredient => typeof ingredient === 'string' ? ingredient.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase() : ingredient);
      const ingredientMatch = ingredients.some(ingredient => ingredient.includes(normalizedSearchTerm));
      return nameMatch || ingredientMatch;
    });
  }

