"use strict";

const CLOUD_X = 100;
const CLOUD_Y = 10;
const CLOUD_WIDTH = 420;
const CLOUD_HEIGHT = 270;
const CLOUD_COLOR = `#ffffff`;

const CLOUD_SHADOW_X = CLOUD_X + 10;
const CLOUD_SHADOW_Y = CLOUD_Y + 10;
const CLOUD_SHADOW_COLOR = `rgba(0, 0, 0, 0.7)`;

const PADDING = 20;
const GAP = 50;

const COLUMN_WIDTH = 40;
const COLUMN_MAX_HEIGHT = 150;

const PLAYER_COLOR = `rgba(255, 0, 0, 1)`;
const DEFAULT_COLOR = `rgba(2, 14, 134, 1)`;
const TEXT_HEADING = `Ура вы победили!`;
const TEXT_SUBHEADING = `Список результатов:`;

const FONT = {
  SIZE: `16px`,
  FAMILY: `PT Mono`,
  COLOR: `#000000`,
  GAP: 20
};

let getColors = (length) => {
  let colors = [];
  colors.push(PLAYER_COLOR);
  for (let i = 0; i < length - 1; i++) {
    let color = DEFAULT_COLOR.slice(0, -2) + Math.random().toFixed(1) + `)`;
    colors.push(color);
  }
  return colors;
};

let isPlayer = (element) => {
  return element === `Вы`;
};

let getPlayerIndex = (array) => {
  return array.findIndex(isPlayer);
};

let swapElements = (firstIndex, secondIndex, array) => {
  let temp = array[firstIndex];
  array[firstIndex] = array[secondIndex];
  array[secondIndex] = temp;
};

let roundArray = (array) => {
  for (let i = 0; i < array.length; i++) {
    array[i] = Math.round(array[i]);
  }
};

let getMaxValue = (array) => {
  let maxValue = array[0];
  array.forEach((item) => {
    if (item > maxValue) {
      maxValue = item;
    }
  });
  return maxValue;
};

let getColumnHeightPx = (height) => {
  let maxHeightPx = COLUMN_MAX_HEIGHT / getMaxValue(height);
  let relativeHeight = [];
  height.forEach((item) => {
    relativeHeight.push(item * maxHeightPx);
  });
  return relativeHeight;
};

let getColumnX = (times) => {
  let array = [];
  times.forEach((item, i) => {
    array.push(CLOUD_X + PADDING + i * (COLUMN_WIDTH + GAP));
  });
  return array;
};

let getColumnY = (heightPx) => {
  let array = [];
  let maxRelativeHeight = getMaxValue(heightPx);
  heightPx.forEach((item) => {
    array.push(maxRelativeHeight - item + PADDING + FONT.GAP + FONT.GAP + PADDING + PADDING);
  });
  return array;
};

let renderRect = (ctx, x, y, width, height, color) => {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, width, height);
};

let renderChart = (ctx, x, y, height, colors) => {
  for (let i = 0; i < height.length; i++) {
    renderRect(ctx, x[i], y[i], COLUMN_WIDTH, height[i], colors[i]);
  }
};

let renderText = (ctx, x, y, font, text) => {
  ctx.textBaseline = `hanging`;
  ctx.fillStyle = `${FONT.COLOR}`;
  ctx.font = `${FONT.SIZE} ${FONT.FAMILY}`;
  ctx.fillText(text, x, y);
};

let renderNames = (ctx, x, names, font) => {
  for (let i = 0; i < names.length; i++) {
    renderText(ctx, x[i], CLOUD_HEIGHT - PADDING / 2, font, names[i]);
  }
};

let renderTimes = (ctx, x, y, times, font) => {
  for (let i = 0; i < times.length; i++) {
    renderText(ctx, x[i], y[i] - FONT.GAP, font, times[i]);
  }
};

window.renderStatistics = (ctx, names, times) => {
  const playerIndex = getPlayerIndex(names);
  let colors = getColors(names.length);

  swapElements(0, playerIndex, times);
  swapElements(0, playerIndex, names);

  let columnHeightPx = getColumnHeightPx(times);
  let columnX = getColumnX(times);
  let columnY = getColumnY(columnHeightPx);

  roundArray(columnHeightPx);
  roundArray(times);

  renderRect(ctx, CLOUD_SHADOW_X, CLOUD_SHADOW_Y, CLOUD_WIDTH, CLOUD_HEIGHT, CLOUD_SHADOW_COLOR); /* рисуем тень*/
  renderRect(ctx, CLOUD_X, CLOUD_Y, CLOUD_WIDTH, CLOUD_HEIGHT, CLOUD_COLOR); /* рисуем облако */
  renderText(ctx, CLOUD_X + PADDING, CLOUD_Y + PADDING, FONT, TEXT_HEADING); /* пишем заголовок */
  renderText(ctx, CLOUD_X + PADDING, CLOUD_Y + PADDING + FONT.GAP, FONT, TEXT_SUBHEADING); /* пишем подзаголовок */
  renderChart(ctx, columnX, columnY, columnHeightPx, colors); /* отрисовываем графики */
  renderNames(ctx, columnX, names, FONT); /* пишем имена */
  renderTimes(ctx, columnX, columnY, times, FONT); /* пишем результаты числами */
};
