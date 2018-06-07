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
  var RADIUS_BEGIN = 50;
  var RADIUS_MAX_CIRCLE = 10;
  var indentCloudWidth = CLOUD_X1 + CLOUD_WIDTH;
  var indentCloudHeidht = CLOUD_Y1 + CLOUD_HEIGHT;
  var startRadiusX = CLOUD_X1 + CLOUD_WIDTH - RADIUS_BEGIN;
  var startRadiusY = CLOUD_Y1 + CLOUD_HEIGHT - RADIUS_BEGIN;
  var centerOfRadius = CLOUD_X1 + CLOUD_WIDTH - RADIUS_MAX_CIRCLE;

  ctx.fillStyle = color;

  ctx.beginPath();
  ctx.moveTo(CLOUD_X1, CLOUD_Y1);
  ctx.lineTo(startRadiusX - RADIUS_MAX_CIRCLE, CLOUD_Y1);
  ctx.bezierCurveTo(startRadiusX, CLOUD_Y1, centerOfRadius, CLOUD_Y1 + RADIUS_MAX_CIRCLE, indentCloudWidth, CLOUD_Y1 + RADIUS_BEGIN);
  ctx.lineTo(indentCloudWidth, startRadiusY - RADIUS_MAX_CIRCLE);
  ctx.bezierCurveTo(indentCloudWidth, startRadiusY, centerOfRadius, indentCloudHeidht - RADIUS_MAX_CIRCLE, startRadiusX, indentCloudHeidht);
  ctx.lineTo(CLOUD_X1, indentCloudHeidht);
  ctx.closePath();
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

var getRandomColorRGBA = function (min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};

window.renderStatistics = function (ctx, players, times) {

  var indentTextX = CLOUD_X + GAP;
  var indentTextY = CLOUD_Y + GAP;
  var columnIndent = BETWEEN_COLUMN + BAR_WIDTH;

  renderCloud(ctx, indentTextX, indentTextY, 'rgba(0, 0, 0, 0.3)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  ctx.fillStyle = '#000';
  ctx.font = '16px PT Mono';
  ctx.fillText('Ура вы победили!', indentTextX, indentTextY + FONT_GAP);
  ctx.fillText('Список результатов:', indentTextX, CLOUD_Y + (GAP + FONT_GAP) * 2);

  var hieghestColomn = getMaxTime(times);

  for (var i = 0; i < players.length; i++) {
    var textLocationColumnX = indentTextX + columnIndent * i;
    var textLocationColumnY = CLOUD_Y + CLOUD_HEIGHT - GAP;
    var proportionColumns = BAR_HEIGHT * times[i] / hieghestColomn;

    ctx.fillStyle = '#000';
    ctx.fillText(players[i], textLocationColumnX, textLocationColumnY);
    ctx.fillText(Math.floor(times[i]), indentTextX + columnIndent * i, textLocationColumnY - GAP - FONT_GAP - proportionColumns);
    ctx.fillStyle = (players[i] === 'Вы') ? 'rgba(255, 0, 0, 1)' : 'rgba(' + getRandomColorRGBA(1, 255) + ', ' + getRandomColorRGBA(1, 255) + ', 255, 1)';
    ctx.fillRect(textLocationColumnX, textLocationColumnY - FONT_GAP, BAR_WIDTH, -proportionColumns);
  }
};
