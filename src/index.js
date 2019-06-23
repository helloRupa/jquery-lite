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

$l.ajax = function(options) {
  let xhr = new XMLHttpRequest();

  const defaults = {
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
    method: 'GET',
    url: '',
    success: () => {},
    error: () => {},
    data: {}
  };
  
  options = $l.extend(defaults, options);
  options.method = options.method.toUpperCase();

  if (options.method === 'GET') {
    const queryString = Object.keys(options.data).map((key) => {
      encodeURIComponent(key) + '=' + encodeURIComponent(options.data[key])
    }).join('&');

    options.url += queryString;
  }

  xhr.onload = function() {
    if (this.status == 200) {
      options.success(JSON.parse(this.responseText));
    } else {
      options.error(this.status);
    }
  };

  xhr.open(options.method, options.url, true);
  xhr.setRequestHeader('Content-type', options.contentType);
  xhr.send(JSON.stringify(options.data));
}
