// Selectionner les nom de tagg dans le tableau
function createTagList(array) {
  const listTitleIng = (Object.keys(array[0]))[3]
  const listTitleApp = (Object.keys(array[0]))[6]
  const listTitleUst = (Object.keys(array[0]))[7]
  const listTitles = [listTitleIng, listTitleApp, listTitleUst]
  return listTitles
}




// Creer les boutons Tag 
function getListBlock(element) {


  const advancedFiltersMenu = document.getElementById('advancedFilters-list');

  const liBlock = document.createElement('li');
  liBlock.className = `advancedFilters-${element}`;
  const divButton = document.createElement('button');
  divButton.setAttribute('class', `advancedFilters-button-${element} ${element}-color`);
  divButton.setAttribute('type', `button`);
  const divButtonName = document.createElement('span');
  const divArrow = document.createElement('div')

  divButtonName.setAttribute('id', `span-${element}`);
  divButtonName.innerText = element;
  divArrow.setAttribute('class', `menuArrow-${element}`);

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


export function displayListButtons(array) {
  const buttonsEntitled = createTagList(array);

  buttonsEntitled.forEach(element => getListBlock(element));

  return buttonsEntitled;
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

  // Voir pour vérifier les case
  const ingredientsArrayCaseSensitive = ingredientsArray.map(string => string.toLowerCase()).filter((string, index, self) => self.indexOf(string) === index);
  const appliancesArrayCaseSensitive = appliancesArray.map(string => string.toLowerCase()).filter((string, index, self) => self.indexOf(string) === index);
  const ustensilsArrayCaseSensitive = ustensilsArray.map(string => string.toLowerCase()).filter((string, index, self) => self.indexOf(string) === index);

  // Remet la premiere lettre de la nouvelle array filtrée (sans doublons "case insensitives")
  const ingredientsArrayFinal = ingredientsArrayCaseSensitive.map(string => string.charAt(0).toUpperCase() + string.slice(1)).sort((a, b) => a.localeCompare(b));
  const applianceArrayFinal = appliancesArrayCaseSensitive.map(string => string.charAt(0).toUpperCase() + string.slice(1)).sort((a, b) => a.localeCompare(b));
  const ustensilsArrayFinal = ustensilsArrayCaseSensitive.map(string => string.charAt(0).toUpperCase() + string.slice(1)).sort((a, b) => a.localeCompare(b));

  const ingredientsTagHtmlDiv = document.getElementById("ingredients-lists");
  const applianceTagHtmlDiv = document.getElementById("appliance-lists");
  const ustensilsTagHtmlDiv = document.getElementById("ustensils-lists");

  ingredientsArrayFinal.forEach(ingredient => {
    //Création d'un element li pour chaque ingrédient
    const ingredientItem = document.createElement('li');
    const ingredientButton = document.createElement('button');
    ingredientItem.classList.add('list');
    ingredientButton.classList.add('List-data');
    ingredientButton.type = "button";
    ingredientButton.innerHTML = ingredient;
    ingredientItem.appendChild(ingredientButton);
    ingredientsTagHtmlDiv.appendChild(ingredientItem);
  });

  applianceArrayFinal.forEach(appliance => {
    //Création d'un element li pour chaque ingrédient
    const applianceItem = document.createElement('li');
    const applianceButton = document.createElement('button');
    applianceItem.classList.add('list');
    applianceButton.classList.add('List-data');
    applianceButton.type = "button";
    applianceButton.innerHTML = appliance;
    applianceItem.appendChild(applianceButton);
    applianceTagHtmlDiv.appendChild(applianceItem);
  });
  ustensilsArrayFinal.forEach(ustensil => {
    //Création d'un element li pour chaque ingrédient
    const ustensilItem = document.createElement('li');
    const ustensilButton = document.createElement('button');
    ustensilItem.classList.add('list');
    ustensilButton.classList.add('List-data');
    ustensilButton.type = "button";
    ustensilButton.innerHTML = ustensil;
    ustensilItem.appendChild(ustensilButton);
    ustensilsTagHtmlDiv.appendChild(ustensilItem);
  });
  return { ingredientsArrayFinal, applianceArrayFinal, ustensilsArrayFinal }
}

export function highLightedTagg(highlightedItems, parentNodeClass) {
  const selectedTaggContainer = document.getElementById("advancedSelectedFilterTags-container");


  highlightedItems.forEach(item => {
    if (!selectedTaggContainer.querySelector(`[data-item='${item}']`)) {
      const selectedTaggContainer = document.getElementById("advancedSelectedFilterTags-container");

      const selectedTaggdiv = document.createElement('div');
      const selecTaggButton = document.createElement('button');
      const selectedTaggCross = document.createElement('i');
      selectedTaggdiv.setAttribute('class', `Selected-Tagg-Container ${parentNodeClass}`);
      selectedTaggdiv.setAttribute('data-item', item)

      selecTaggButton.setAttribute('type', `button`);
      selecTaggButton.setAttribute('class', `Selected-Tagg ${parentNodeClass}`);


      selectedTaggCross.setAttribute('class', `fa-regular fa-circle-xmark ${parentNodeClass}`);
      selectedTaggCross.setAttribute('id', `Selected-Cross`);

      selecTaggButton.innerHTML += item;
      selectedTaggContainer.appendChild(selectedTaggdiv);
      selectedTaggdiv.appendChild(selecTaggButton);
      selectedTaggdiv.appendChild(selectedTaggCross);
    }
  });
}


export function modifyListContent(ingredientsArray, appliancesArray, ustensilsArray) {

  // Supprime les doublons des deux arrays
  ingredientsArray = [...new Set(ingredientsArray)];
  appliancesArray = [...new Set(appliancesArray)];
  ustensilsArray = [...new Set(ustensilsArray)];

  // Voir pour vérifier les case
  const ingredientsArrayCaseSensitive = ingredientsArray.map(string => string.toLowerCase()).filter((string, index, self) => self.indexOf(string) === index);
  const appliancesArrayCaseSensitive = appliancesArray.map(string => string.toLowerCase()).filter((string, index, self) => self.indexOf(string) === index);
  const ustensilsArrayCaseSensitive = ustensilsArray.map(string => string.toLowerCase()).filter((string, index, self) => self.indexOf(string) === index);

  // Remet la premiere lettre de la nouvelle array filtrée (sans doublons "case insensitives")
  const ingredientsArrayFinal = ingredientsArrayCaseSensitive.map(string => string.charAt(0).toUpperCase() + string.slice(1)).sort((a, b) => a.localeCompare(b));
  const applianceArrayFinal = appliancesArrayCaseSensitive.map(string => string.charAt(0).toUpperCase() + string.slice(1)).sort((a, b) => a.localeCompare(b));
  const ustensilsArrayFinal = ustensilsArrayCaseSensitive.map(string => string.charAt(0).toUpperCase() + string.slice(1)).sort((a, b) => a.localeCompare(b));

  const ingredientsTagHtmlDiv = document.getElementById("ingredients-lists");
  const applianceTagHtmlDiv = document.getElementById("appliance-lists");
  const ustensilsTagHtmlDiv = document.getElementById("ustensils-lists");


  ingredientsArrayFinal.forEach(ingredient => {
    //Création d'un element li pour chaque ingrédient
    const ingredientItem = document.createElement('li');
    const ingredientButton = document.createElement('button');
    ingredientItem.classList.add('list');
    ingredientButton.classList.add('List-data');
    ingredientButton.type = "button";
    ingredientButton.innerHTML = ingredient;
    ingredientItem.appendChild(ingredientButton);
    ingredientsTagHtmlDiv.appendChild(ingredientItem);
  });

  applianceArrayFinal.forEach(appliance => {
    //Création d'un element li pour chaque ingrédient
    const applianceItem = document.createElement('li');
    const applianceButton = document.createElement('button');
    applianceItem.classList.add('list');
    applianceButton.classList.add('List-data');
    applianceButton.type = "button";
    applianceButton.innerHTML = appliance;
    applianceItem.appendChild(applianceButton);
    applianceTagHtmlDiv.appendChild(applianceItem);
  });
  ustensilsArrayFinal.forEach(ustensil => {
    //Création d'un element li pour chaque ingrédient
    const ustensilItem = document.createElement('li');
    const ustensilButton = document.createElement('button');
    ustensilItem.classList.add('list');
    ustensilButton.classList.add('List-data');
    ustensilButton.type = "button";
    ustensilButton.innerHTML = ustensil;
    ustensilItem.appendChild(ustensilButton);
    ustensilsTagHtmlDiv.appendChild(ustensilItem);
  });
  return { ingredientsArray, appliancesArray, ustensilsArray }
}


export function updateListDisplays(target) {
  target.parentNode.remove();
}

export function removeHighlightedTagg(highlightedItems, target, arrayIngredient, arrayAppliance, arrayUstensils ) {
  const targetItem = target.previousSibling.textContent;

  // Trouver l'index de l'item dans l'array highlightedItems
  const index = highlightedItems.findIndex(item => item === targetItem);

  const nextSiblingText = target.previousElementSibling.textContent;
  if (target.classList.contains('ingredients-color')) {
    arrayIngredient.push(nextSiblingText);
    highlightedItems.splice(index, 1);
    target.parentNode.remove();
  }
  if (target.classList.contains('appliance-color')) {
    arrayAppliance.push(nextSiblingText);
    highlightedItems.splice(index, 1);
    target.parentNode.remove();
  }
  if (target.classList.contains('ustensils-color')) {
    arrayUstensils.push(nextSiblingText);
    highlightedItems.splice(index, 1);
    target.parentNode.remove();
  }
  modifyListContent(arrayIngredient, arrayAppliance, arrayUstensils);
}














