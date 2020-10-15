"use strict";

const NUMBER_CHARACTERS = 4;
const NAMES = [`Иван`, `Хуан`, `Себастьян`, `Мария`, `Кристоф`, `Виктор`, `Юлия`, `Люпита`, `Вашингтон`];
const SURNAMES = [`да Марья`, `Верон`, `Мирабелла`, `Вальц`, `Онопко`, `Топольницкая`, `Нионго`, `Ирвинг`];
const COAT_COLORS = [`rgb(101, 137, 164)`, `rgb(241, 43, 107)`, `rgb(146, 100, 161)`, `rgb(56, 159, 117)`, `rgb(215, 210, 55)`, `rgb(0, 0, 0)`];
const EYES_COLORS = [`black`, `red`, `blue`, `yellow`, `green`];
const FIREBALL_COLORS = [`#ee4830`, `#30a8ee`, `#5ce6c0`, `#e848d5`, `#e6e848`];
const MIN_NAME_LENGTH = 2;
const MAX_NAME_LENGTH = 25;

let setupSimilar = document.querySelector(`.setup-similar`);
let setupOpen = document.querySelector(`.setup-open`);
let setupClose = document.querySelector(`.setup-close`);
let setup = document.querySelector(`.setup`);
let setupSubmit = document.querySelector(`.setup-submit`);
let userNameInput = document.querySelector(`.setup-user-name`);
let userNameInputIsFocused = false;
let setupWizardForm = document.querySelector(`.setup-wizard-form`);

let player = document.querySelector(`.setup-player`);
let coat = player.querySelector(`.setup-wizard .wizard-coat`);
let eyes = player.querySelector(`.setup-wizard .wizard-eyes`);
let fireball = player.querySelector(`.setup-fireball-wrap`);
let coatColorInput = player.querySelector(`input[name="coat-color"]`);
let eyesColorInput = player.querySelector(`input[name="eyes-color"]`);
let fireballColorInput = player.querySelector(`input[name="fireball-color"]`);
let currentCoatColorPos = 0;
let currentEyesColorPos = 0;
let currentFireballColorPos = 0;

let show = (element) => {
  element.classList.remove(`hidden`);
};

let hide = (element) => {
  element.classList.add(`hidden`);
};

let getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; /* Максимум не включается, минимум включается*/
};

let getName = (arrayOfNames, arrayOfSurnames, isReverse) => {
  return isReverse ? arrayOfSurnames[getRandomInt(0, NUMBER_CHARACTERS)] + ` ` + arrayOfNames[getRandomInt(0, NUMBER_CHARACTERS)] : arrayOfNames[getRandomInt(0, NUMBER_CHARACTERS)] + ` ` + arrayOfSurnames[getRandomInt(0, NUMBER_CHARACTERS)];
};

let getCharacter = (arrayOfCoatColors, arrayOfEyesColors) => {
  return {
    name: getName(NAMES, SURNAMES),
    coatColor: arrayOfCoatColors[getRandomInt(0, NUMBER_CHARACTERS)],
    eyesColor: arrayOfEyesColors[getRandomInt(0, NUMBER_CHARACTERS)]
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

let onPopupEscPress = (evt) => {
  if ((evt.key === `Escape`) && (!userNameInputIsFocused)) {
    evt.preventDefault();
    closePopup();
  }
};

let openPopup = () => {
  show(setup);
  document.addEventListener(`keydown`, onPopupEscPress);
};

let closePopup = () => {
  hide(setup);
  document.removeEventListener(`keydown`, onPopupEscPress);
};

let characters = getCharacters(NUMBER_CHARACTERS);
renderCharacters(characters);
show(setupSimilar);

let changeCoatColor = () => {
  currentCoatColorPos++;
  if (COAT_COLORS.length === currentCoatColorPos) {
    currentCoatColorPos = 0;
  }
  let color = COAT_COLORS[currentCoatColorPos];
  coat.style.fill = color;
  coatColorInput.value = color;
};

let changeEyesColor = () => {
  currentEyesColorPos++;
  if (EYES_COLORS.length === currentEyesColorPos) {
    currentEyesColorPos = 0;
  }
  let color = EYES_COLORS[currentEyesColorPos];
  eyes.style.fill = color;
  eyesColorInput.value = color;
};

let changeFireballColor = () => {
  currentFireballColorPos++;
  if (FIREBALL_COLORS.length === currentFireballColorPos) {
    currentFireballColorPos = 0;
  }
  let color = FIREBALL_COLORS[currentFireballColorPos];
  fireball.style.background = color;
  fireballColorInput.value = color;
};

let colorChangeHandler = (evt) => {
  if (evt.target.matches(`.setup-wizard .wizard-coat`)) {
    changeCoatColor();
  } else if (evt.target.matches(`.setup-wizard .wizard-eyes`)) {
    changeEyesColor();
  } else if (evt.target.matches(`.setup-fireball`)) {
    changeFireballColor(evt);
  }
};

setupOpen.addEventListener(`click`, () => {
  openPopup();
});

setupOpen.addEventListener(`keydown`, (evt) => {
  if (evt.key === `Enter`) {
    openPopup();
  }
});

setupClose.addEventListener(`click`, () => {
  closePopup();
});

setupClose.addEventListener(`keydown`, (evt) => {
  if (evt.key === `Enter`) {
    openPopup();
  }
});

setupSubmit.addEventListener(`keydown`, (evt) => {
  if (evt.key === `Enter`) {
    closePopup();
  }
});

userNameInput.addEventListener(`focus`, () => {
  userNameInputIsFocused = true;
});

userNameInput.addEventListener(`blur`, () => {
  userNameInputIsFocused = false;
});

userNameInput.addEventListener(`input`, () => {
  let valueLength = userNameInput.value.length;
  if (valueLength < MIN_NAME_LENGTH) {
    userNameInput.setCustomValidity(`Ещё ` + (MIN_NAME_LENGTH - valueLength) + ` симв.`);
  } else if (valueLength > MAX_NAME_LENGTH) {
    userNameInput.setCustomValidity(`Удалите лишние ` + (valueLength - MAX_NAME_LENGTH) + ` симв.`);
  } else {
    userNameInput.setCustomValidity(``);
  }
  userNameInput.reportValidity();
});

setupWizardForm.addEventListener(`click`, colorChangeHandler);
