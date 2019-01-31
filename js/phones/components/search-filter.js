import Component from '../../component.js';

export default class Filter extends Component {
  constructor({ element, onChange = () => {} }) {
    super({ element });

    this._element = element;

    this._onChange = onChange;
    this._debounced = this.debounce(this._onChange, 200);

    this._inputStatus = true;

    this._render();

    this.on('input', '[data-element="search-input"]', (event, inputItem) => {
      this._debounced(inputItem);
    });
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
