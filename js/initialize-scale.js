'use strict';
var MIN_SCALE_PERCENT = 25;
var MAX_SCALE_PERCENT = 100;

window.initializeScale = function (element, stepScale, scalePercentNode, imagePreview) {
  var getCurrentScalePercentValue = function () {
    return parseInt(scalePercentNode.value, 10);
  };

  function scaleImageByStep(step) {
    var zoomValue = getCurrentScalePercentValue() + step;
    if (zoomValue >= MIN_SCALE_PERCENT && zoomValue <= MAX_SCALE_PERCENT) {
      scalePercentNode.value = zoomValue + '%';
      imagePreview.style = 'transform: scale(' + zoomValue / 100 + ')';
    }
  }

  element.addEventListener('click', function () {
    scaleImageByStep(stepScale);
  });
};
