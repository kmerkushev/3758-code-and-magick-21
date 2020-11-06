"use strict";

(() => {
  let createCharacter = (object) => {
    let template = document.querySelector(`#similar-wizard-template`).content.querySelector(`.setup-similar-item`);
    let element = template.cloneNode(true);
    element.querySelector(`.setup-similar-label`).textContent = object.name;
    element.querySelector(`.wizard-coat`).style.fill = object.colorCoat;
    element.querySelector(`.wizard-eyes`).style.fill = object.colorEyes;
    return element;
  };

  let renderCharacters = (arrayOfObjects) => {
    let setupSimilarList = document.querySelector(`.setup-similar-list`);
    let fragment = document.createDocumentFragment();
    for (let i = 0; i < NUMBER_CHARACTERS; i++) {
      let wizard = createCharacter(arrayOfObjects[i]);
      fragment.appendChild(wizard);
    }
    setupSimilarList.appendChild(fragment);
  };

  window.similar = {
    render: (arrayOfObjects) => {
      renderCharacters(arrayOfObjects);
    }
  };

})();
