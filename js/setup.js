"use strict";

let setupWizardForm = document.querySelector(`.setup-wizard-form`);
let setupSimilar = document.querySelector(`.setup-similar`);

//window.similar.render();
util.show(setupSimilar);

setupWizardForm.addEventListener(`click`, (evt) => {
  window.colorize(evt);
});
