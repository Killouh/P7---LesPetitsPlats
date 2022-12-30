

// Selectionner les nom de tagg dans le tableau
export function createTagList(array) {
  const listTitleIng = (Object.keys(array[0]))[3]
  const listTitleApp = (Object.keys(array[0]))[6]
  const listTitleUst = (Object.keys(array[0]))[7]
  const listTitles = [listTitleIng, listTitleApp, listTitleUst]
  return listTitles
}




// Creer les boutons Tag 
export function getListBlock(element) {


  const advancedFiltersMenu = document.getElementById('advancedFilters-list');

  const liBlock = document.createElement('li');
  liBlock.className = 'advancedFilters';
  const divButton = document.createElement('button');
  divButton.setAttribute('class', `advancedFilters-button ${element}-color`);
  divButton.setAttribute('type', `button`);
  const divButtonName = document.createElement('span');
  const divArrow = document.createElement('div')

  divButtonName.setAttribute('id', `span-${element}`);
  divButtonName.innerText = element;
  divArrow.setAttribute('class', `menuArrow`);




  const divButtonSearchBar = document.createElement('input');
  divButtonSearchBar.setAttribute('class', `${element}-color advancedSearch`);
  divButtonSearchBar.setAttribute('type', 'search');
  divButtonSearchBar.setAttribute('id', `search-${element}`);
  divButtonSearchBar.setAttribute('placeholder', `Rechercher dans ${element}`);
  // mettre une valeur par défaut
  const menuBlock = document.createElement('menu');
  menuBlock.setAttribute('class', `${element}-color`);
  menuBlock.setAttribute('id', `${element}-lists`);

  advancedFiltersMenu.appendChild(liBlock);
  liBlock.appendChild(divButton);
  divButton.appendChild(divButtonName);
  divButton.appendChild(divArrow);
  divButton.appendChild(divButtonSearchBar);


  liBlock.appendChild(menuBlock);

}






// Supprime les doublons et crée un nouvel array (créé pendant les premieres version du code)
function removeDuplicateObjects(array, property) {
  const uniqueIds = [];

  const unique = array.filter(element => {
    const isDuplicate = uniqueIds.includes(element[property]);

    if (!isDuplicate) {
      uniqueIds.push(element[property]);

      return true;
    }

    return false;
  });

  return unique;
}

// Créer la liste de tagg 
export function createTagListContent(recipes) {

  // Créer liste des ingrédients
  let ingredientsArray = [];
  let appliancesArray = [];
  let ustensilsArray = [];

  for (let recipe of recipes) {
    ingredientsArray = ingredientsArray.concat(recipe.ingredients);
    appliancesArray = appliancesArray.concat(recipe.appliance);
    ustensilsArray = ustensilsArray.concat(recipe.ustensils);
  }

  // Supprime les doublons des deux arrays
  ingredientsArray = [...new Map(ingredientsArray.map(ingredient => [ingredient["ingredient"], ingredient["ingredient"]])).values()];
  appliancesArray = [...new Set(appliancesArray)];
  ustensilsArray = [...new Set(ustensilsArray)];


  let ustensilsTagHtml = "";
  let applianceTagHtml = "";
  let ingredientsTagHtml = "";

  for (let name of ustensilsArray) {
    ustensilsTagHtml += `<li class="list">`;
    ustensilsTagHtml += `<button class="List-data"type="button" >${name}</button> `;
    ustensilsTagHtml += `</li>`;

  }
  for (let name of appliancesArray) {
    applianceTagHtml += `<li class="list">`;
    applianceTagHtml += `<button class="List-data" type="button">${name}</button> `;
    applianceTagHtml += `</li>`;

  }

  for (let name of ingredientsArray) {
    ingredientsTagHtml += `<li class="list">`;
    ingredientsTagHtml += `<button class="List-data" type="button">${name} </button> `;
    ingredientsTagHtml += `</li>`;

  }

  return { ingredientsTagHtml, ustensilsTagHtml, applianceTagHtml }
}















