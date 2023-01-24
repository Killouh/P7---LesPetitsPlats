import { searchIngredientTagg, searchApplianceTagg, searchUstensilsTagg, createTagListContent } from '../factories/tagsFactory.js'
import { generateRecipeHTML } from '../factories/recipesFactory.js'
import { recipes } from '../../data/recipes.js';
import { highlightedItems, ingredientsContainer, applianceContainer, ustensilsContainer, updateTaggList } from '../search.js';


// Finir la recherche croisée








// Les trois mini searchbar spécifiques à chaque menu
export function minisearchbarIngredient(searchbar, resultsContainer, array) {
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

export function minisearchbarAppliance(searchbar, resultsContainer, array) {
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

export function minisearchbarUstensils(searchbar, resultsContainer, array) {
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