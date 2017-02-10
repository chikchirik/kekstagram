'use strict';

var uploadOverlay = document.querySelector('.upload-overlay');
var selectImageForm = document.forms['upload-select-image'];

function showOverlayElement() {
  selectImageForm.classList.add('invisible');
  uploadOverlay.classList.remove('invisible');
  setDefaultFilter();
}

function hideOverlayElement() {
  uploadOverlay.classList.add('invisible');
  selectImageForm.classList.remove('invisible');
}

/* Image filter */
var imagePreview = uploadOverlay.querySelector('.filter-image-preview');
var filterControls = document.querySelector('.upload-filter-controls');
var currentFilter = null;
var currentPressedLabel = null;
var ENTER_KEY_CODE = 13;

function setDefaultFilter() {
  scaleImage(100);
  imagePreview.classList.remove(currentFilter);
}

function setFilter(filterName) {
  imagePreview.classList.remove(currentFilter);
  currentFilter = 'filter-' + filterName;
  imagePreview.classList.add(currentFilter);
}

function setPressedStatusByFilter(element) {
  if (currentPressedLabel) {
    currentPressedLabel.setAttribute('aria-pressed', 'false');
  }
  element.setAttribute('aria-pressed', 'true');
  currentPressedLabel = element;
}

/* Zoom */
var uploadZoomValue = uploadOverlay.querySelector('.upload-resize-controls-value');
var stepZoom = 25;
var minZoom = 25;
var maxZoom = 100;

var currentZoomValue = function () {
  return parseInt(uploadZoomValue.value, 10);
};

function scaleImage(value) {
  uploadZoomValue.value = value + '%';
  imagePreview.style = 'transform: scale(' + value / 100 + ')';
}

function zoomByStep(step) {
  var zoomValue = currentZoomValue() + step;
  if (zoomValue >= minZoom && zoomValue <= maxZoom) {
    scaleImage(zoomValue);
  }
}

selectImageForm.querySelector('#upload-file').addEventListener('change', function () {
  showOverlayElement();
});
document.forms['upload-filter'].querySelector('.upload-form-cancel').addEventListener('click', function () {
  hideOverlayElement();
});

filterControls.addEventListener('change', function (event) {
  setFilter(event.target.value);
  setPressedStatusByFilter(document.querySelector('label[for="' + event.target.id + '"]'));
});

filterControls.addEventListener('keydown', function (event) {
  if (event.keyCode === ENTER_KEY_CODE) {
    var filterId = document.getElementById(event.target.getAttribute('for'));
    filterId.checked = 'true';
    setFilter(filterId.value);
    setPressedStatusByFilter(event.target);
  }
});

uploadOverlay.querySelector('.upload-resize-controls-button-inc').addEventListener('click', function () {
  zoomByStep(+stepZoom);
});
uploadOverlay.querySelector('.upload-resize-controls-button-dec').addEventListener('click', function () {
  zoomByStep(-stepZoom);
});
