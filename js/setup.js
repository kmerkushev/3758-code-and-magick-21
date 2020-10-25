"use strict";

let setupWizardForm = document.querySelector(`.setup-wizard-form`);

window.similar.render();

setupWizardForm.addEventListener(`click`, (evt) => {
  window.colorize(evt);
});
