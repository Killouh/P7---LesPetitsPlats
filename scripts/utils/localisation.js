//Traduit les titre des tag généré en JS
export function translatebuttons() {
  const ingredientsTag = document.getElementById("span-ingredients");
  const applianceTag = document.getElementById("span-appliance");
  const ustensusilsTag = document.getElementById("span-ustensils");
  const ingredientsSearchBar = document.getElementById("search-ingredients");
  const applianceSearchBar = document.getElementById("search-appliance");
  const ustensusilsSearchBar = document.getElementById("search-ustensils");

  if (ingredientsTag.textContent === "ingredients") {
    ingredientsTag.innerText = "Ingrédients";
  }
  if (applianceTag.textContent === "appliance") {
    applianceTag.innerText = "Appareil";
  }
  if (ustensusilsTag.textContent === "ustensils") {
    ustensusilsTag.innerText = "Ustensiles";
  }
  if (ingredientsSearchBar.placeholder === "Rechercher dans ingredients") {
    ingredientsSearchBar.placeholder === "Rechercher dans Ingrédients";
  }
  if (applianceSearchBar.placeholder === "Rechercher dans appliance") {
    applianceSearchBar.placeholder === "Rechercher dans Appareil";
  }
  if (ustensusilsSearchBar.placeholder === "Rechercher dans ustensils") {
    ustensusilsSearchBar.placeholder === "Rechercher dans Ustensiles";
  }
}