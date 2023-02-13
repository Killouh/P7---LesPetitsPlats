import { searchIngredientTagg, searchApplianceTagg, searchUstensilsTagg} from '../factories/tagsFactory.js'

// Searchbar Ingrédient
export function minisearchbarIngredient(searchbar, resultsContainer, array, highlightedItems) {
  searchbar.addEventListener('keyup', () => {
    const searchTerm = searchbar.value.toLowerCase();

    if (searchTerm.length === 0) {
      resultsContainer.innerHTML = '';
      searchIngredientTagg(array, highlightedItems);
      return;
    }

    if (searchTerm.length < 0) {
      resultsContainer.innerHTML = '';
      searchIngredientTagg(array, highlightedItems);
      return;
    }

    // Recherche sur la searchbar pour les ingredients et les noms de plat //
    var searchTerm_normalized = searchTerm.normalize('NFD').replace(/\p{Diacritic}/gu, "");
    const matchingRecipes = array.filter((item) => {
      return item.toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, "").includes(searchTerm_normalized)
    });

    resultsContainer.innerHTML = '';

    if (matchingRecipes.length > 0) {
      searchIngredientTagg(matchingRecipes, highlightedItems);
    }
  });
}

// Searchbar Appliance
export function minisearchbarAppliance(searchbar, resultsContainer, array, highlightedItems) {
  searchbar.addEventListener('keyup', () => {
    const searchTerm = searchbar.value.toLowerCase();


    if (searchTerm.length < 0) {
      resultsContainer.innerHTML = '';
      searchApplianceTagg(array, highlightedItems);
      return;
    }

    // Recherche sur la searchbar pour les ingredients et les noms de plat //
    var searchTerm_normalized = searchTerm.normalize('NFD').replace(/\p{Diacritic}/gu, "");
    const matchingRecipes = array.filter((item) => {
      return item.toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, "").includes(searchTerm_normalized)
    });

    resultsContainer.innerHTML = '';

    if (matchingRecipes.length > 0) {
      searchApplianceTagg(matchingRecipes, highlightedItems);
    }
  });
}

// Searchbar Ustensils
export function minisearchbarUstensils(searchbar, resultsContainer, array, highlightedItems) {
  searchbar.addEventListener('keyup', () => {
    const searchTerm = searchbar.value.toLowerCase();



    if (searchTerm.length < 3) {
      resultsContainer.innerHTML = '';
      searchUstensilsTagg(array, highlightedItems);
      return;
    }

    // Recherche sur la searchbar pour les ingredients et les noms de plat //
    var searchTerm_normalized = searchTerm.normalize('NFD').replace(/\p{Diacritic}/gu, "");
    const matchingRecipes = array.filter((item) => {
      return item.toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, "").includes(searchTerm_normalized)
    });

    resultsContainer.innerHTML = '';

    if (matchingRecipes.length > 0) {
      searchUstensilsTagg(matchingRecipes, highlightedItems);
    }
  });
}


// Permet d'écouter ce qui est saisi dans la barre de recherche lors de l'utilisation de cross removal
export function updateRecipes(compatibleRecipes, searchbar, searchTerm) {
  let updatedRecipes = compatibleRecipes;
  if (searchbar.value.length > 0) {
    searchTerm = searchbar.value.toLowerCase();
    let searchTerm_normalized = searchTerm.normalize('NFD').replace(/\p{Diacritic}/gu, "");
    updatedRecipes = updatedRecipes.filter((recipe) => {
      return recipe.name.toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, "").includes(searchTerm_normalized) ||
          recipe.ingredients.some((ingredient) => ingredient.ingredient.toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, "").includes(searchTerm_normalized)) ||
          recipe.description.toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, "").includes(searchTerm_normalized);
    });
  }
  return updatedRecipes;
}


// Crée les array de chaque type de Tagg
export function extractIngredients(compatibleRecipesFromTagg) {
  let ingredients = [];
  compatibleRecipesFromTagg.forEach(recipe => {
    recipe.ingredients.forEach(ingredient => {
      ingredients.push(ingredient.ingredient);
    });
  });
  return ingredients;
}

export function extractUstensils(compatibleRecipesFromTagg) {
  let ustensils = [];
  compatibleRecipesFromTagg.forEach(recipe => {
    recipe.ustensils.forEach(ustensil => {
      ustensils.push(ustensil);
    });
  });
  return ustensils;
}

export function extractAppliance(compatibleRecipesFromTagg) {
  let appliance = [];
  compatibleRecipesFromTagg.forEach(recipe => {
    appliance.push(recipe.appliance);
  });

  return appliance;
}