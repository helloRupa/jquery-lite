const mod = 'fn';

class DOMNodeCollection {
  constructor(arr) {
    this.collection = arr;
    arr.forEach((el, idx) => {
      this[idx] = el;
    });
  }

  html(str = '') {
    if (str.length > 0) {
      this.collection.forEach((el) => {
        el.innerHTML = str;
      });

      return this;
    } else {
      return this.collection[0].innerHTML;
    }
  }

  empty() {
    this.collection.forEach((el) => {
      el.innerHTML = '';
    });

    return this;
  }

  append(...args) {
    const collectionEnd = this.collection.length - 1;

    this.collection.forEach((el, outerIdx) => {
      args.forEach((addition, innerIdx) => {
        if (typeof addition === 'string') {
          el.insertAdjacentHTML('beforeend', addition.outerHTML || addition);
        } else {
          if (outerIdx !== collectionEnd) {
            el.append(addition.cloneNode(true));
          } else {
            el.append(addition);
          }
        }
      });
    });

    return this;
  }

  attr(title, value = '') {
    if (typeof title === 'object' && !Array.isArray(title)) {
      this.collection.forEach((el) => {
        for (const key in title) {
          el.setAttribute(key, title[key]);
        }
      });
    }

    if (value === '') {
      return this[0].getAttribute(title);
    } else {
      this.collection.forEach((el, idx) => {
        if (typeof value === 'function') {
          el.setAttribute(title, value(idx, el));
        } else if (typeof value === 'string') {
          el.setAttribute(title, value);
        }
      });
    }

    return this;
  }

  addClass(title) {
    this.collection.forEach((el) => {
      el.classList.add(title);
    });

    return this;
  }

  removeClass(title) {
    this.collection.forEach((el) => {
      el.classList.remove(title);
    });

    return this;
  }

  children() {
    let kids = [];

    this.collection.forEach((el) => {
      kids.push(...el.children);
    });

    return new DOMNodeCollection(kids);
  }

  parent() {
    let parents = [];

    this.collection.forEach((el) => {
      if (parents.length === 0 || !parents.includes(el.parentElement)) {
        parents.push(el.parentElement);
      }
    });

    return new DOMNodeCollection(parents);
  }

  find(selector) {
    let matches = [];

    this.collection.forEach((el) => {
      matches.push(...el.querySelectorAll(selector));
    });

    return new DOMNodeCollection(matches);
  }

  remove() {
    let removed = [];
    this.collection.forEach((el) => {
      removed.push(el);
      el.remove();
    });

    return new DOMNodeCollection(removed);
  }

  on(event, callback) {
    const eName = this.eventName(event);

    this.collection.forEach((el) => {
      const oldHandler = el[eName];
      el.removeEventListener(event, el[eName]);

      el[eName] = function(e) {
        if (typeof oldHandler == 'function') {
          oldHandler(e);
        }
        callback(e);
      };

      el.addEventListener(event, el[eName]);
    });
  }

  off(event) {
    const eName = this.eventName(event);

    this.collection.forEach((el) => {
      el.removeEventListener(event, el[eName]);
      el[eName] = null;
    });
  }

  eventName(event) {
    return event + mod;
  }
}

module.exports = DOMNodeCollection;