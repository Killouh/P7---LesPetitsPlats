

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
  menuBlock.setAttribute('id', `${element}-list`);

  advancedFiltersMenu.appendChild(liBlock);
  liBlock.appendChild(divButton);
  divButton.appendChild(divButtonName);
  divButton.appendChild(divArrow);
  divButton.appendChild(divButtonSearchBar);
 
  
  liBlock.appendChild(menuBlock);

}




// Créer la liste de tagg 

export function createTagListContent(recipes) {

  // Créer liste des ingrédients
  let ingredientsArray = [];

  for (let recipe of recipes) {
    for (let ingredient of recipe.ingredients) {
      ingredientsArray.push({ id: Math.random() * 200 | 0, name: ingredient.ingredient });
    }
  }

  // Créer liste des appareils
  let applianceArray = [];

  for (let appliance of recipes) {
    applianceArray.push({ id: Math.random() * 200 | 0, name: appliance.appliance });
  }

  //Créer liste des ustensiles 
  let ustensilArray = [];

  for (let ustensils of recipes) {
    for (let ustensil of ustensils.ustensils) {
      ustensilArray.push({ id: Math.random() * 200 | 0, name: ustensil });
    }
  }

  // Supprime les doublons et créer un nouvel array
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


  // Fourni la liste des arrays sans doublons
  const ustensilsTagArrayClean = removeDuplicateObjects(ustensilArray, 'name');
  const applianceTagArrayClean = removeDuplicateObjects(applianceArray, 'name');
  const ingredientsTagArrayClean = removeDuplicateObjects(ingredientsArray, 'name');
  let ustensilsTagHtml = "";
  let applianceTagHtml = "";
  let ingredientsTagHtml = "";




  for (let name of ustensilsTagArrayClean) {
    ustensilsTagHtml += `<li class="list">`;
    ustensilsTagHtml += `<button class="List-data">${name.name}</button> `;
    ustensilsTagHtml += `</li>`;

  }
  for (let name of applianceTagArrayClean) {
    applianceTagHtml += `<li class="list">`;
    applianceTagHtml += `<button class="List-data">${name.name}</button> `;
    applianceTagHtml += `</li>`;

  }

  for (let name of ingredientsTagArrayClean) {
    ingredientsTagHtml += `<li class="list">`;
    ingredientsTagHtml += `<button class="List-data">${name.name}</button> `;
    ingredientsTagHtml += `</li>`;

  }


  return { ingredientsTagHtml, ustensilsTagHtml, applianceTagHtml }



}















