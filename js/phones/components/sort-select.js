import Component from '../../component.js';

export default class Sort extends Component {
  constructor({ element, onChange = () => {} }) {
    super({ element });
    this._element = element;
    this._onChange = onChange;

    this._render();

    this.on('change', '[data-element="sort-select-dropdown"]', (event, dropDown) => {
      this._onChange(dropDown);
    })
  }

  _render() {
    this._element.innerHTML = `
      <p>
        Sort by:
        <select data-element="sort-select-dropdown">
          <option value="age">Newest</option>
          <option value="name">Alphabetical</option>
        </select>
      </p>
    `;
  }
};
