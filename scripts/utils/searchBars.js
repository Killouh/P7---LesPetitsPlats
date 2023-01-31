import { searchIngredientTagg, searchApplianceTagg, searchUstensilsTagg} from '../factories/tagsFactory.js'




// Searchbar Ingrédient
export function minisearchbarIngredient(searchbar, resultsContainer, array) {
    searchbar.addEventListener('keyup', () => {
        const searchTerm = searchbar.value.toLowerCase();

        // Regles searchbar si saisie nulle ou < 3
        if (searchTerm.length === 0 || searchTerm.length < 3 ) {
            resultsContainer.innerHTML = '';
            searchIngredientTagg(array);

            return;
        }


        // Recherche sur la searchbar pour les ingredients et les noms de plat //
        var searchTerm_normalized = searchTerm.normalize('NFD').replace(/\p{Diacritic}/gu, "");
        const matchingRecipes = array.filter((item) => {
            return item.toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, "").includes(searchTerm_normalized)
        });

        resultsContainer.innerHTML = '';

        if (matchingRecipes.length > 0) {
            searchIngredientTagg(matchingRecipes);
        }
    });
};

// Searchbar Appliance
export function minisearchbarAppliance(searchbar, resultsContainer, array) {
    searchbar.addEventListener('keyup', () => {
        const searchTerm = searchbar.value.toLowerCase();

        // Regles searchbar si saisie nulle ou < 3
        if (searchTerm.length === 0 || searchTerm.length < 3 ) {
            resultsContainer.innerHTML = '';
            searchApplianceTagg(array);
            return;
        }

        // Recherche sur la searchbar pour les ingredients et les noms de plat //
        var searchTerm_normalized = searchTerm.normalize('NFD').replace(/\p{Diacritic}/gu, "");
        const matchingRecipes = array.filter((item) => {
            return item.toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, "").includes(searchTerm_normalized)
        });

        resultsContainer.innerHTML = '';

        if (matchingRecipes.length > 0) {
            searchApplianceTagg(matchingRecipes);
        }
    });
};

// Searchbar Ustensils
export function minisearchbarUstensils(searchbar, resultsContainer, array) {
    searchbar.addEventListener('keyup', () => {
        const searchTerm = searchbar.value.toLowerCase();

        // Regles searchbar si saisie nulle ou < 3
        if (searchTerm.length === 0 || searchTerm.length < 3 ) {
            resultsContainer.innerHTML = '';
            searchUstensilsTagg(array);

            return;
        }

        // Recherche sur la searchbar pour les ingredients et les noms de plat //
        var searchTerm_normalized = searchTerm.normalize('NFD').replace(/\p{Diacritic}/gu, "");
        const matchingRecipes = array.filter((item) => {
            return item.toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, "").includes(searchTerm_normalized)
        });

        resultsContainer.innerHTML = '';

        if (matchingRecipes.length > 0) {
            searchUstensilsTagg(matchingRecipes);
        }
    });
};


// Permet d'écouter ce qui est saisie dans la barre de recherche lors de l'utilisation de cross removal
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