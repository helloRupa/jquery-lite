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
    } else {
      return this.collection[0].innerHTML;
    }
  }

  empty() {
    this.collection.forEach((el) => {
      el.innerHTML = '';
    });
  }

  append(...args) {
    // const exists = this.evaluateElements(args);
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
  }

  evaluateElements(els) {
    return els.map((el) => {
      if (typeof el === 'string') {
        return false;
      } else {
        return document.body.contains(el);
      }
    });
  }
}

module.exports = DOMNodeCollection;