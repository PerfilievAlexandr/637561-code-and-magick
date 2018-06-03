'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var FONT_GAP = 16;
var BAR_WIDTH = 40;
var BAR_HEIGHT = 150;
var BETWEEN_COLUMN = 50;


var renderCloud = function (ctx, CLOUD_X1, CLOUD_Y1, color) {
  var radiusBegin = 50;
  var radiusMaxCircle = 10;

  ctx.fillStyle = color;

  ctx.moveTo(CLOUD_X1, CLOUD_Y1);
  ctx.lineTo(CLOUD_X1 + CLOUD_WIDTH - radiusBegin - radiusMaxCircle, CLOUD_Y1);
  ctx.bezierCurveTo(CLOUD_X1 + CLOUD_WIDTH - radiusBegin, CLOUD_Y1, CLOUD_X1 + CLOUD_WIDTH - radiusMaxCircle, CLOUD_Y1 + radiusMaxCircle, CLOUD_X1 + CLOUD_WIDTH, CLOUD_Y1 + radiusBegin);
  ctx.lineTo(CLOUD_X1 + CLOUD_WIDTH, CLOUD_Y1 + CLOUD_HEIGHT - radiusBegin - radiusMaxCircle);
  ctx.bezierCurveTo(CLOUD_X1 + CLOUD_WIDTH, CLOUD_Y1 + CLOUD_HEIGHT - radiusBegin, CLOUD_X1 + CLOUD_WIDTH - radiusMaxCircle, CLOUD_Y1 + CLOUD_HEIGHT - radiusMaxCircle, CLOUD_X1 + CLOUD_WIDTH - radiusBegin, CLOUD_Y1 + CLOUD_HEIGHT);
  ctx.lineTo(CLOUD_X1, CLOUD_Y1 + CLOUD_HEIGHT);
  ctx.closePath();
  ctx.stroke();
  ctx.fill();
};

var getMaxTime = function (arr) {
  var maxTime = arr[0];

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxTime) {
      maxTime = arr[i];
    }
  }
  return maxTime;
};

window.renderStatistics = function (ctx, players, times) {

  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.3)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  ctx.fillStyle = '#000';
  ctx.font = '16px PT Mono';
  ctx.fillText('Ура вы победили!', CLOUD_X + GAP, CLOUD_Y + GAP + FONT_GAP);
  ctx.fillText('Список результатов:', CLOUD_X + GAP, CLOUD_Y + (GAP + FONT_GAP) * 2);

  var hieghestColomn = getMaxTime(times);

  for (var i = 0; i < players.length; i++) {
    ctx.fillStyle = '#000';
    ctx.fillText(players[i], CLOUD_X + GAP + (BETWEEN_COLUMN + BAR_WIDTH) * i, CLOUD_Y + CLOUD_HEIGHT - GAP);
    ctx.fillText(Math.floor(times[i]), CLOUD_X + GAP + (BETWEEN_COLUMN + BAR_WIDTH) * i, CLOUD_Y + CLOUD_HEIGHT - GAP * 2 - FONT_GAP - (BAR_HEIGHT * times[i]) / hieghestColomn);
    if (players[i] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    } else {
      ctx.fillStyle = 'rgba(' + (Math.floor(Math.random() * (255 - 1 + 1)) + 1) + ', ' + (Math.floor(Math.random() * (255 - 1 + 1)) + 1) + ', ' + 255 + ', ' + 1 + ')';
    }

    ctx.fillRect(CLOUD_X + GAP + (BETWEEN_COLUMN + BAR_WIDTH) * i, CLOUD_Y + CLOUD_HEIGHT - GAP - FONT_GAP, BAR_WIDTH, -(BAR_HEIGHT * times[i]) / hieghestColomn);
  }
};
