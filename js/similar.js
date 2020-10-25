"use strict";

(() => {
  let setupSimilar = document.querySelector(`.setup-similar`);
  let getName = (arrayOfNames, arrayOfSurnames, isReverse) => {
    return isReverse ? arrayOfSurnames[window.util.getRandomInt(0, NUMBER_CHARACTERS)] + ` ` + arrayOfNames[window.util.getRandomInt(0, NUMBER_CHARACTERS)] : arrayOfNames[window.util.getRandomInt(0, NUMBER_CHARACTERS)] + ` ` + arrayOfSurnames[window.util.getRandomInt(0, NUMBER_CHARACTERS)];
  };

  let getCharacter = (arrayOfCoatColors, arrayOfEyesColors) => {
    return {
      name: getName(NAMES, SURNAMES),
      coatColor: arrayOfCoatColors[window.util.getRandomInt(0, NUMBER_CHARACTERS)],
      eyesColor: arrayOfEyesColors[window.util.getRandomInt(0, NUMBER_CHARACTERS)]
    };
  };

  let getCharacters = (numberCharacters) => {
    let characters = [];
    for (let i = 0; i < numberCharacters; i++) {
      characters.push(getCharacter(COAT_COLORS, EYES_COLORS));
    }
    return characters;
  };

  let createCharacter = (object) => {
    let template = document.querySelector(`#similar-wizard-template`).content.querySelector(`.setup-similar-item`);
    let element = template.cloneNode(true);
    element.querySelector(`.setup-similar-label`).textContent = object.name;
    element.querySelector(`.wizard-coat`).style.fill = object.coatColor;
    element.querySelector(`.wizard-eyes`).style.fill = object.eyesColor;
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

  let characters = getCharacters(NUMBER_CHARACTERS);

  window.similar = {
    render: () => {
      renderCharacters(characters);
      window.util.show(setupSimilar);
    }
  };

})();
