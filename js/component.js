export default class Component {
  constructor({ element }) {
    this._element = element;
  }

  sortNames(a, b) {
    return (a.name < b.name) ?  -1 : (a.name > b.name) ? 1 : 0;
  }

  sortAges(a, b) {
    return a.age - b.age;
  }

  hide() {
    this._element.hidden = true;
  }

  show() {
    this._element.hidden = false;
  }

  on(eventName, dataElementName, callback) {
    this._element.addEventListener(eventName, (event) => {
      let elementSelected = event.target.closest(`[data-element="${dataElementName}"]`);

      if(!elementSelected || !this._element.contains(elementSelected)) {
        return;
      }

      callback(event, elementSelected);
    });
  }

  debounce(func, ms) {
    let isBusy = false;
    let timerId;
    function wrapper(arg) {
      if (isBusy) {
        clearTimeout(timerId);
      }

      isBusy = true;
      timerId = setTimeout(() => {
        func.call(this, arg);
        isBusy = false;
      }, ms);
    }

    return wrapper;
  }
};
