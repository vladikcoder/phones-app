import Component from '../../component.js';

export default class Sort extends Component {
  constructor({ element }) {
    super({ element });
    this._element = element;

    this._render();

    this.on('change', 'sort-select-dropdown', (event, dropDown) => {
      this.emit('sort-type-changed', dropDown);
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
