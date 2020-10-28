"use strict";

(() => {
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

  window.util = {
    show: show,
    hide: hide,
    getRandomInt: getRandomInt
  };

})();
