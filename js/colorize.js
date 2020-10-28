"use strict";

(() => {
  let player = document.querySelector(`.setup-player`);
  let coat = player.querySelector(`.setup-wizard .wizard-coat`);
  let eyes = player.querySelector(`.setup-wizard .wizard-eyes`);
  let fireball = player.querySelector(`.setup-fireball-wrap`);
  let coatColorInput = document.querySelector(`input[name="coat-color"]`);
  let eyesColorInput = document.querySelector(`input[name="eyes-color"]`);
  let fireballColorInput = document.querySelector(`input[name="fireball-color"]`);
  let currentCoatColorPos = 0;
  let currentEyesColorPos = 0;
  let currentFireballColorPos = 0;

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

  window.colorize = (evt) => {
    if (evt.target.matches(`.setup-wizard .wizard-coat`)) {
      changeCoatColor();
    } else if (evt.target.matches(`.setup-wizard .wizard-eyes`)) {
      changeEyesColor();
    } else if (evt.target.matches(`.setup-fireball`)) {
      changeFireballColor(evt);
    }
  };

})();
