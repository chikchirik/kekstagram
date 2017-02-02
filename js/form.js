'use strict';

var LINKS = {};
function getLink(selector) {
  return selector in LINKS ? LINKS[selector] : (LINKS[selector] = document.querySelector(selector));
}

function eventOpenEditForm(editForm, imageInput, uploadForm) {
  getLink(imageInput).addEventListener('change', function () {
    getLink(uploadForm).classList.add('invisible');
    getLink(editForm).classList.remove('invisible');
  });
}

function eventCloseEditForm(btnClose, editForm, uploadForm) {
  getLink(btnClose).addEventListener('click', function () {
    getLink(editForm).classList.add('invisible');
    getLink(uploadForm).classList.remove('invisible');
  });
}

function eventChangeFilter(nameForm, image) {
  document.forms[nameForm].addEventListener('change', function () {
    var activeFilter = document.querySelectorAll('input[name="upload-filter"]:checked');
    getLink(image).className = image.slice(1) + ' ' + (activeFilter.length > 0 ? 'filter-' + activeFilter[0].value : null);
  });
}

function eventZoomOut(btnZoomOut, image, zoomValue, step, minZoom) {
  var zoom = getLink(zoomValue);

  getLink(btnZoomOut).addEventListener('click', function () {
    var value = parseInt(zoom.value, 10);
    var newValue = value - step;
    zoom.value = (newValue < minZoom ? value : newValue) + '%';
    getLink(image).style = 'transform: scale(' + parseInt(zoom.value, 10) / 100 + ')';
  });
}

function eventZoomIn(btnZoomIn, image, zoomValue, step, maxZoom) {
  var zoom = getLink(zoomValue);

  getLink(btnZoomIn).addEventListener('click', function () {
    var value = parseInt(zoom.value, 10);
    var newValue = value + step;
    zoom.value = (newValue > maxZoom ? value : newValue) + '%';
    getLink(image).style = 'transform: scale(' + parseInt(zoom.value, 10) / 100 + ')';
  });
}

eventOpenEditForm('.upload-overlay', '#upload-file', '#upload-select-image');
eventCloseEditForm('.upload-form-cancel', '.upload-overlay', '#upload-select-image');
eventChangeFilter('upload-filter', '.filter-image-preview');
eventZoomOut('.upload-resize-controls-button-dec', '.filter-image-preview', '.upload-resize-controls-value', 25, 25);
eventZoomIn('.upload-resize-controls-button-inc', '.filter-image-preview', '.upload-resize-controls-value', 25, 100);
