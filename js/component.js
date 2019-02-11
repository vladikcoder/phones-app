export default class Component {
  constructor({ element }) {
    this._element = element;
    this._callbacksMap = {};
    this._helper = {
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
      },
    };
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

  subscribe(eventName, callback) {
    console.assert(
      !this._callbacksMap.hasOwnProperty(eventName),
      `Subscription on ${eventName} is already exists!`
    );

    this._callbacksMap[eventName] = callback;
  }

  emit(eventName, ...data) {
    this._callbacksMap[eventName](...data);
  }

};
