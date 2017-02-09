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
var filterControls = document.querySelector('.upload-filter-controls');
var currentFilter = null;
var ENTER_KEY_CODE = 13;

var selectFilterHandler = function (event) {
  changeFilter(event.target.value);
};

function changeFilter(filterName) {
  imagePreview.classList.remove(currentFilter);
  currentFilter = 'filter-' + filterName;
  imagePreview.classList.add(currentFilter);
}

function changeFilterValue(event) {
  if (event.keyCode === ENTER_KEY_CODE) {
    var filterId = document.getElementById(event.target.getAttribute('for'));
    filterId.checked = 'true';
    changeFilter(filterId.value);
  }
}

function selectFilterKeydownHandler(event) {
  changeFilterValue(event);
  toggleButton(event.target);
}

function toggleButton(element) {
  var pressed = (element.getAttribute('aria-pressed') === 'true');
  element.setAttribute('aria-pressed', !pressed);
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

filterControls.addEventListener('change', selectFilterHandler);
filterControls.addEventListener('keydown', selectFilterKeydownHandler);

uploadOverlay.querySelector('.upload-resize-controls-button-inc').addEventListener('click', zoomIn);
uploadOverlay.querySelector('.upload-resize-controls-button-dec').addEventListener('click', zoomOut);
