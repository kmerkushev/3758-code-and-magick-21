"use strict";

const NUMBER_CHARACTERS = 4;
const names = [`Иван`, `Хуан`, `Себастьян`, `Мария`, `Кристоф`, `Виктор`, `Юлия`, `Люпита`, `Вашингтон`];
const surnames = [`да Марья`, `Верон`, `Мирабелла`, `Вальц`, `Онопко`, `Топольницкая`, `Нионго`, `Ирвинг`];
const coatColors = [`rgb(101, 137, 164)`, `rgb(241, 43, 107)`, `rgb(146, 100, 161)`, `rgb(56, 159, 117)`, `rgb(215, 210, 55)`, `rgb(0, 0, 0)`];
const eyesColors = [`black`, `red`, `blue`, `yellow`, `green`];

let removeHidden = (className) => {
  document.querySelector(`.` + className).classList.remove(`hidden`);
};

removeHidden(`setup`);

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; /* Максимум не включается, минимум включается*/
}

let getName = (arrayOfNames, arrayOfSurnames, isReverse) => {
  let characterName = ``;
  if (isReverse) {
    characterName = arrayOfSurnames[getRandomInt(0, NUMBER_CHARACTERS)] + ` ` + arrayOfNames[getRandomInt(0, NUMBER_CHARACTERS)];
  } else {
    characterName = arrayOfNames[getRandomInt(0, NUMBER_CHARACTERS)] + ` ` + arrayOfSurnames[getRandomInt(0, NUMBER_CHARACTERS)];
  }
  return characterName;
};

let getCharacter = (arrayOfCoatColors, arrayOfEyesColors) => {
  let character = {
    name: getName(names, surnames),
    coatColor: arrayOfCoatColors[getRandomInt(0, NUMBER_CHARACTERS)],
    eyesColor: arrayOfEyesColors[getRandomInt(0, NUMBER_CHARACTERS)]
  };
  return character;
};

let getCharacters = (numberCharacters) => {
  let characters = [];
  for (let i = 0; i < numberCharacters; i++) {
    characters.push(getCharacter(coatColors, eyesColors));
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
renderCharacters(characters);
removeHidden(`setup-similar`);
