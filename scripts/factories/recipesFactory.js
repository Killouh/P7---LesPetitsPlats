// Génère les cartes de recettes
export function generateRecipeHTML(recipes) {
  let html = "";

  for (let recipe of recipes) {

    const recipeElement = document.getElementById(recipe.id);
    if (!recipeElement) {

      html += `<article class = "recipe-card" id='${recipe.id}'>`
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
        html += `<li>${ingredient.ingredient}`;
        if (ingredient.quantity) {

          html += `: <span class ="unit-quantity">${ingredient.quantity}`;
        }
        if (ingredient.unit) {

          // Remplace grammes par G
          if (ingredient.unit.includes("grammes")) {
            ingredient.unit = ingredient.unit.replace(/grammes/gi, 'g');
          }
          // Remplace cuillère à soupe par cuillère
          if (ingredient.unit.includes("cuillère à soupe")) {
            ingredient.unit = ingredient.unit.replace(/cuillère à soupe/gi, 'cuillères');
          }
          // Remplace cuillères à soupe par cuillère
          if (ingredient.unit.includes("cuillères à soupe")) {
            ingredient.unit = ingredient.unit.replace(/cuillères à soupe/gi, 'cuillères');
          }
          // Met au singulier si un seul
          if (ingredient.quantity == 1) {
            ingredient.unit = ingredient.unit.replace(/cuillères/gi, 'cuillère');
          }
          // Met au singulier si un seul
          if (ingredient.quantity == 1) {
            ingredient.unit = ingredient.unit.replace(/sachets/gi, 'sachet');
          }
          // Met au singulier si un seul
          if (ingredient.quantity == 1) {
            ingredient.unit = ingredient.unit.replace(/pincées/gi, 'pincée');
          }
          // Met au singulier si un seul
          if (ingredient.quantity == 1) {
            ingredient.unit = ingredient.unit.replace(/tranches/gi, 'tranche');
          }
          // Met au singulier si un seul
          if (ingredient.quantity == 1) {
            ingredient.unit = ingredient.unit.replace(/boites/gi, 'boite');
          }
          // Met au singulier si un seul
          if (ingredient.quantity == 1) {
            ingredient.unit = ingredient.unit.replace(/barquettes/gi, 'barquette');
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
  }
  


  return html;
}



