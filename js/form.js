'use strict';

var uploadOverlay = document.querySelector('.upload-overlay');
var selectImageForm = document.forms['upload-select-image'];

var showOverlayHandler = function () {
  showOverlayElement();
};

var hideOverlayHandler = function () {
  hideOverlayElement();
};

function setDefaultFilter() {
  scaleImage(100);
  imagePreview.classList.remove(currentFilter);
}

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
var currentFilter = null;

var selectFilterHandler = function (event) {
  imagePreview.classList.remove(currentFilter);
  currentFilter = 'filter-' + event.target.value;
  imagePreview.classList.add(currentFilter);
};

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

function zoomOut() {
  var zoom = currentZoomValue() - stepZoom;
  if (zoom >= minZoom) {
    scaleImage(zoom);
  }
}

function zoomIn() {
  var zoom = currentZoomValue() + stepZoom;
  if (zoom <= maxZoom) {
    scaleImage(zoom);
  }
}

selectImageForm.querySelector('#upload-file').addEventListener('change', showOverlayHandler);
document.forms['upload-filter'].querySelector('.upload-form-cancel').addEventListener('click', hideOverlayHandler);

document.forms['upload-filter'].addEventListener('change', selectFilterHandler);

uploadOverlay.querySelector('.upload-resize-controls-button-inc').addEventListener('click', zoomIn);
uploadOverlay.querySelector('.upload-resize-controls-button-dec').addEventListener('click', zoomOut);
