const DOMNodeCollection = require('./dom_node_collection');

$l = function (selector) {
  if (selector instanceof HTMLElement) {
    return new DOMNodeCollection([selector]);
  }

  return new DOMNodeCollection([...document.querySelectorAll(selector)]);
};