/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/dom_node_collection.js":
/*!************************************!*\
  !*** ./src/dom_node_collection.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("const mod = 'fn';\n\nclass DOMNodeCollection {\n  constructor(arr) {\n    this.collection = arr;\n    arr.forEach((el, idx) => {\n      this[idx] = el;\n    });\n  }\n\n  html(str = '') {\n    if (str.length > 0) {\n      this.collection.forEach((el) => {\n        el.innerHTML = str;\n      });\n\n      return this;\n    } else {\n      return this.collection[0].innerHTML;\n    }\n  }\n\n  empty() {\n    this.collection.forEach((el) => {\n      el.innerHTML = '';\n    });\n\n    return this;\n  }\n\n  append(...args) {\n    const collectionEnd = this.collection.length - 1;\n\n    this.collection.forEach((el, outerIdx) => {\n      args.forEach((addition, innerIdx) => {\n        if (typeof addition === 'string') {\n          el.insertAdjacentHTML('beforeend', addition.outerHTML || addition);\n        } else {\n          if (outerIdx !== collectionEnd) {\n            el.append(addition.cloneNode(true));\n          } else {\n            el.append(addition);\n          }\n        }\n      });\n    });\n\n    return this;\n  }\n\n  attr(title, value = '') {\n    if (typeof title === 'object' && !Array.isArray(title)) {\n      this.collection.forEach((el) => {\n        for (const key in title) {\n          el.setAttribute(key, title[key]);\n        }\n      });\n    }\n\n    if (value === '') {\n      return this[0].getAttribute(title);\n    } else {\n      this.collection.forEach((el, idx) => {\n        if (typeof value === 'function') {\n          el.setAttribute(title, value(idx, el));\n        } else if (typeof value === 'string') {\n          el.setAttribute(title, value);\n        }\n      });\n    }\n\n    return this;\n  }\n\n  addClass(title) {\n    this.collection.forEach((el) => {\n      el.classList.add(title);\n    });\n\n    return this;\n  }\n\n  removeClass(title) {\n    this.collection.forEach((el) => {\n      el.classList.remove(title);\n    });\n\n    return this;\n  }\n\n  children() {\n    let kids = [];\n\n    this.collection.forEach((el) => {\n      kids.push(...el.children);\n    });\n\n    return new DOMNodeCollection(kids);\n  }\n\n  parent() {\n    let parents = [];\n\n    this.collection.forEach((el) => {\n      if (parents.length === 0 || !parents.includes(el.parentElement)) {\n        parents.push(el.parentElement);\n      }\n    });\n\n    return new DOMNodeCollection(parents);\n  }\n\n  find(selector) {\n    let matches = [];\n\n    this.collection.forEach((el) => {\n      matches.push(...el.querySelectorAll(selector));\n    });\n\n    return new DOMNodeCollection(matches);\n  }\n\n  remove() {\n    let removed = [];\n    this.collection.forEach((el) => {\n      removed.push(el);\n      el.remove();\n    });\n\n    return new DOMNodeCollection(removed);\n  }\n\n  on(event, callback) {\n    const eName = this.eventName(event);\n\n    this.collection.forEach((el) => {\n      const oldHandler = el[eName];\n      el.removeEventListener(event, el[eName]);\n\n      el[eName] = function(e) {\n        if (typeof oldHandler == 'function') {\n          oldHandler(e);\n        }\n        callback(e);\n      };\n\n      el.addEventListener(event, el[eName]);\n    });\n  }\n\n  off(event) {\n    const eName = this.eventName(event);\n\n    this.collection.forEach((el) => {\n      el.removeEventListener(event, el[eName]);\n      el[eName] = null;\n    });\n  }\n\n  eventName(event) {\n    return event + mod;\n  }\n}\n\nmodule.exports = DOMNodeCollection;\n\n//# sourceURL=webpack:///./src/dom_node_collection.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const DOMNodeCollection = __webpack_require__(/*! ./dom_node_collection */ \"./src/dom_node_collection.js\");\n\n$l = function (selector) {\n  if (typeof selector == 'function') {\n    document.addEventListener('DOMContentLoaded', () => { selector(); });\n    return;\n  }\n\n  if (selector instanceof HTMLElement) {\n    return new DOMNodeCollection([selector]);\n  }\n\n  return new DOMNodeCollection([...document.querySelectorAll(selector)]);\n};\n\n$l.extend = function(...args) {\n  let merged = {};\n\n  args.forEach((arg) => {\n    merged = { ...merged, ...arg };\n  });\n\n  return merged;\n}\n\n$l.ajax = function(options) {\n  let xhr = new XMLHttpRequest();\n\n  const defaults = {\n    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',\n    method: 'GET',\n    url: '',\n    success: () => {},\n    error: () => {},\n    data: {}\n  };\n  \n  options = $l.extend(defaults, options);\n  options.method = options.method.toUpperCase();\n\n  if (options.method === 'GET') {\n    const queryString = Object.keys(options.data).map((key) => {\n      encodeURIComponent(key) + '=' + encodeURIComponent(options.data[key])\n    }).join('&');\n\n    options.url += queryString;\n  }\n\n  xhr.onload = function() {\n    if (this.status == 200) {\n      options.success(JSON.parse(this.responseText));\n    } else {\n      options.error(this.status);\n    }\n  };\n\n  xhr.open(options.method, options.url, true);\n  xhr.setRequestHeader('Content-type', options.contentType);\n  xhr.send(JSON.stringify(options.data));\n}\n\n$l.ajaxPromise = function(options) {\n  const defaults = {\n    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',\n    method: 'GET',\n    url: '',\n    success: () => {},\n    error: () => {},\n    data: {}\n  };\n  \n  options = $l.extend(defaults, options);\n  options.method = options.method.toUpperCase();\n\n  if (options.method === 'GET') {\n    const queryString = Object.keys(options.data).map((key) => {\n      encodeURIComponent(key) + '=' + encodeURIComponent(options.data[key])\n    }).join('&');\n\n    options.url += queryString;\n  }\n\n  return new Promise((resolve, reject) => {\n    let xhr = new XMLHttpRequest();\n\n    xhr.open(options.method, options.url, true);\n    xhr.onload = resolve;\n    xhr.onerror = reject;\n    xhr.setRequestHeader('Content-type', options.contentType);\n    xhr.send(JSON.stringify(options.data));\n  });\n}\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ })

/******/ });