'use strict';

var FILTER_NODES = {};
var FILTERS_LABEL_NODES = {};

var ENTER_KEY_CODE = 13;

function getNodeBySelector(selector, storage) {
  return selector in storage ? storage[selector] : (storage[selector] = document.querySelector(selector));
}

window.initializeFilters = function (filterControls, currentFilter, currentPressedLabel, imagePreview) {
  function setFilter(filterName) {
    imagePreview.classList.remove(currentFilter);
    if (filterName) {
      window.currentFilter = 'filter-' + filterName;
      imagePreview.classList.add(window.currentFilter);
    }
  }

  function setPressedStatusByFilter(element) {
    if (currentPressedLabel) {
      currentPressedLabel.setAttribute('aria-pressed', 'false');
    }
    element.setAttribute('aria-pressed', 'true');
    currentPressedLabel = element;
  }

  filterControls.addEventListener('change', function (event) {
    setFilter(event.target.value);
    setPressedStatusByFilter(getNodeBySelector('label[for="' + event.target.id + '"]', FILTERS_LABEL_NODES));
  });

  filterControls.addEventListener('keydown', function (event) {
    if (event.keyCode === ENTER_KEY_CODE) {
      var filterId = getNodeBySelector('#' + event.target.getAttribute('for'), FILTER_NODES);
      filterId.checked = true;
      setFilter(filterId.value);
      setPressedStatusByFilter(event.target);
    }
  });
};
