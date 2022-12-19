import { recipes } from '../../data/recipes.js'

// Génère les cartes de recettes
function generateRecipeHTML(recipes) {
  let html = "";
  for (let recipe of recipes) {
    html += '<article class = "recipe-card">'
    html += '<img class = "ImgPlaceholder">';
    html += '<div class = "header-card">'
    html += `<h3>${recipe.name}</h3>`;
    html += `<div class = "time-card">`;
    html += `<p>${recipe.time} min</p>`;
    html += `<i class="far fa-clock"></i>`;
    html += '</div>';
    html += '</div>';
    html += `<div class = "text-card">`;
    html += "<ul>";
    for (let ingredient of recipe.ingredients) {
      html += `<li>${ingredient.ingredient}: `;
      if (ingredient.quantity) {

        html += `<span class ="unit-quantity">${ingredient.quantity}`;
      }
      if (ingredient.unit) {
        
        // Remplace grammes par G
        if (ingredient.unit.includes("grammes")) {
          ingredient.unit = ingredient.unit.replace(/grammes/gi, 'g');
        }
        // Remplace cuillère à soupe par cuillère
        if (ingredient.unit.includes("cuillère à soupe"))  {
          ingredient.unit = ingredient.unit.replace(/cuillère à soupe/gi, 'cuillères');
        }
        // Remplace cuillères à soupe par cuillère
        if (ingredient.unit.includes("cuillères à soupe"))  {
          ingredient.unit = ingredient.unit.replace(/cuillères à soupe/gi, 'cuillères');
        }
        // Met cuillère au singulier  si une seule
        if (ingredient.quantity == 1) {
          ingredient.unit = ingredient.unit.replace(/cuillères/gi, 'cuillère');
        }
        html += ` ${ingredient.unit}</span>`;
      }



      html += '</li>'
    }

    html += "</ul>";
    html += `<p class = "recipe-description">${recipe.description}</p>`;
    html += '</div>';
    html += '</article>'

  }
  return html;
}

const recipeListDiv = document.getElementById("resultRecipes-container");
const recipeHTML = generateRecipeHTML(recipes);
recipeListDiv.innerHTML += recipeHTML;
