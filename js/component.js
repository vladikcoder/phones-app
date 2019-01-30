export default class Component {
  constructor({ element }) {
    this._element = element;
  }

  hide() {
    this._element.hidden = true;
  }

  show() {
    this._element.hidden = false;
  }

  on(eventName, selector, callback) {
    this._element.addEventListener(eventName, (event) => {
      let elementSelected = event.target.closest(`${selector}`);

      if(!elementSelected || !this._element.contains(elementSelected)) {
        return;
      }

      callback(event, elementSelected);
    });
  }
}