'use strict';

var uploadOverlay = document.querySelector('.upload-overlay');
var selectImageForm = document.forms['upload-select-image'];
var scalePercentNode = uploadOverlay.querySelector('.upload-resize-controls-value');
var imagePreview = uploadOverlay.querySelector('.filter-image-preview');
var currentFilter = null;
var currentPressedLabel = null;

var SCALE_PERCENT_STEP = 25;

function showOverlayElement() {
  selectImageForm.classList.add('invisible');
  uploadOverlay.classList.remove('invisible');

  imagePreview.classList.remove(currentFilter);
  imagePreview.style = 'transform: scale(1)';
  scalePercentNode.value = '100%';

  uploadOverlay.setAttribute('aria-hidden', 'false');
}

function hideOverlayElement() {
  uploadOverlay.classList.add('invisible');
  selectImageForm.classList.remove('invisible');
  uploadOverlay.setAttribute('aria-hidden', 'true');
}

selectImageForm.querySelector('#upload-file').addEventListener('change', function () {
  showOverlayElement();
});
document.forms['upload-filter'].querySelector('.upload-form-cancel').addEventListener('click', function () {
  hideOverlayElement();
});

window.initializeFilters(document.querySelector('.upload-filter-controls'), currentFilter, currentPressedLabel, imagePreview);
window.initializeScale(uploadOverlay.querySelector('.upload-resize-controls-button-dec'), -SCALE_PERCENT_STEP, scalePercentNode, imagePreview);
window.initializeScale(uploadOverlay.querySelector('.upload-resize-controls-button-inc'), SCALE_PERCENT_STEP, scalePercentNode, imagePreview);
