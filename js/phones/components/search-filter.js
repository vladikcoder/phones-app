import Component from '../../component.js';

export default class Filter extends Component {
  constructor({ element }) {
    super({ element });

    this._element = element;

    this._inputStatus = true;

    this._render();

    this.on('input', 'search-input', (event, inputItem) => {
      this.emit('on-input-change', inputItem);
    });
  }

  subscribe(eventName, callback) {
    const DEBOUNCE_DELAY = 300;
    let debouncedCallback = this.debounce(callback, DEBOUNCE_DELAY);

    super.subscribe(eventName, debouncedCallback);
  }

  _render() {
    this._element.innerHTML = `
      <p>
        Search:
        <input data-element="search-input" type="text">
      </p>
    `;
  }
};
