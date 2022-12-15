import { recipes } from '../../data/recipes.js'


function generateRecipeHTML(recipes) {
  let html = "";
  for (let recipe of recipes) {
    html += '<article class = "recipe-card">'
    html += '<img class = "ImgPlaceholder">';
    html += `<h3>${recipe.name}</h3>`;
    html += "<ul>";
    for (let ingredient of recipe.ingredients) {
      html += `<li>${ingredient}</li>`;
    }
    html += "</ul>";
    html += `<p>${recipe.description}</p>`;
    html += '</article>'

  }
  return html;
}

const recipeListDiv = document.getElementById("resultRecipes-container");
const recipeHTML = generateRecipeHTML(recipes);
recipeListDiv.innerHTML += recipeHTML;
