const DOMNodeCollection = require('./dom_node_collection');

$l = function (selector) {
  if (typeof selector == 'function') {
    document.addEventListener('DOMContentLoaded', () => { selector(); });
    return;
  }

  if (selector instanceof HTMLElement) {
    return new DOMNodeCollection([selector]);
  }

  return new DOMNodeCollection([...document.querySelectorAll(selector)]);
};

$l.extend = function(...args) {
  let merged = {};

  args.forEach((arg) => {
    merged = { ...merged, ...arg };
  });

  return merged;
}