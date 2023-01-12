// Affiche le contenu du bouton Tagg // Faire des class CSS supplémentaires
export function displayButtonsContent(button, container, miniSearch, objectTag, objectDiv, arrow) {
    let cssVisibility = "visible";
    let cssDisplay = "block";

    document.addEventListener('click', () => {
        container.style.visibility = cssVisibility;
        miniSearch.style.visibility = cssVisibility;
        miniSearch.style.display = cssDisplay;
        arrow.style.transform = "rotate(0deg)";
        arrow.style.left = "20";
        arrow.style.right = "none";
        objectDiv.style.width = "80%";
        objectDiv.style.backgroundColor = "#3282f7";
        objectDiv.style.borderRadius = "20px"
        objectTag.style.display = "none"
        button.style.width = "100%"
    });
}
// Ferme le bouton tagg par clic hors de la zone ou sur la fleche
export function hideMenuOnClick(container, miniSearch, objectTag, objectDiv, arrow) {
    let cssVisibility = "hidden";
    let cssDisplay = "none";

    document.addEventListener('click', event => {
        if (event.target !== objectDiv && !objectDiv.contains(event.target)) {

            container.style.visibility = cssVisibility;
            miniSearch.style.visibility = cssVisibility;
            miniSearch.style.display = cssDisplay;
            arrow.style.transform = "rotate(180deg)"
            objectDiv.style.width = "170px"
            objectDiv.style.backgroundcolor = "none"
            objectTag.style.display = "block"
        }
        if (event.target == arrow && arrow.contains(event.target)) {

            container.style.visibility = cssVisibility;
            miniSearch.style.visibility = cssVisibility;
            miniSearch.style.display = cssDisplay;
            arrow.style.transform = "rotate(180deg)"
            objectDiv.style.width = "170px"
            objectDiv.style.backgroundcolor = "none"
            objectTag.style.display = "block"
        }
    });
}



