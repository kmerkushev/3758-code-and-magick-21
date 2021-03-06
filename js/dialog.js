"use strict";

(() => {
  let setupOpen = document.querySelector(`.setup-open`);
  let setup = document.querySelector(`.setup`);
  let setupClose = setup.querySelector(`.setup-close`);

  let setupSubmit = setup.querySelector(`.setup-submit`);
  let userNameInput = setup.querySelector(`.setup-user-name`);
  let userNameInputIsFocused = false;
  let uploadBtn = setup.querySelector(`.upload`);

  let onPopupEscPress = (evt) => {
    if ((evt.key === `Escape`) && (!userNameInputIsFocused)) {
      evt.preventDefault();
      closePopup();
    }
  };

  let openPopup = () => {
    window.util.show(setup);
    document.addEventListener(`keydown`, onPopupEscPress);
  };

  let closePopup = () => {
    window.util.hide(setup);
    document.removeEventListener(`keydown`, onPopupEscPress);
    setup.style.left = ``;
    setup.style.top = ``;
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

  uploadBtn.addEventListener(`mousedown`, (evt) => {
    evt.preventDefault();

    let startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    let dragged = false;

    let onMouseMove = function(moveEvt) {
      moveEvt.preventDefault();

      dragged = true;

      let shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      setup.style.top = (setup.offsetTop - shift.y) + 'px';
      setup.style.left = (setup.offsetLeft - shift.x) + 'px';
    };

    let onMouseUp = function(upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      if (dragged) {
        var onClickPreventDefault = function(clickEvt) {
          clickEvt.preventDefault();
          uploadBtn.removeEventListener('click', onClickPreventDefault)
        };
        uploadBtn.addEventListener('click', onClickPreventDefault);
      }
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

})();
