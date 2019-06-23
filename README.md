# jQuery Lite
Vanilla JS, requires webpack for file bundling

## Access
- $l(): global-scoped method for accessing methods. If given a function, waits until DOM is loaded to execute it. Otherwise returns an object of type DOMNodeCollection.

## $l Class Methods
- $l.extend(object, [object, ..., object]): Returns a merge of two or more objects without mutating any. If there are matching keys, the last object provided as an argument takes precedence.
- $l.ajax(object): Makes an HTTPRequest using the provided options hash. Options include contentType, method, url, success callback, error callback, and data.
- $l.ajaxPromise(object): Same as above, but returns a promise as opposed to using callbacks.

## DOMNodeCollection Methods
Wrapping an HTMLElement or collection of elements in jQuery Lite ($l) returns a chainable DOMNodeCollection object, which provides the following methods:
- [integer]: Access a specific node in the collection
- html(): Get the inner HTML of a node. If an argument is provided, modifies the inner HTML of all elements in the collection.
- empty(): Replaces inner HTML of each element with an empty string.
- append(el, ..., el): Append one or more elements to each element in the collection. If appending an element that exists in the document, the element is cloned and then appended with the exception of the last element which is simply appended - resulting in the element being removed from its original location in the DOM. Also accepts strings.
- attr(string || object, string(optional)): With only one string argument, returns the value of the provided attribute of the first element in the collection. With two string arguments, sets the attribute (first argument) of each element in the collection to the second argument. With a single object as an argument, uses the keys to set the attributes of each element to the associated value.
- addClass(string): Add a class to each element in the collection.
- removeClass(string): Remove the provided class from each element in the collection.
- children(): Returns the children of each element in the collection as a DOMNodeCollection.
- parent(): Returns the parent of each element in the collection as a DOMNodeCollection.
- find(string): Find elements matching the provided selector within the scope of the caller. Returns a DOMNodeCollection.
- remove(): Removes the selected elements from the DOM and returns them in a DOMNodeCollection.
- on(string, callback): Adds an event listener for the provided event on the entire collection.
- off(string): Removes all callbacks which are bound to the event for the entire collection.

