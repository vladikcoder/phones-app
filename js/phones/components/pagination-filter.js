import Component from '../../component.js';

export default class PaginationFilter extends Component {
  constructor({ element }) {
    super({ element });
    this._element = element;

    this._render();

    this.on('change', 'page-items-qty-dropdown', (event, dropDown) => {
      this.emit('page-items-qty-changed', dropDown);
    });

    this.on('click', 'page-number', (event, pageNumber) => {
      this.emit('page-selected', pageNumber);
    });

  }

  refresh() {
    this._render();
  }

  _render() {
    this._element.innerHTML = `
      <p data-element="pagination-container">
        <select data-element="page-items-qty-dropdown">
          <option value="3">3</option>
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20" selected>20</option>
        </select>
      </p>
      <div data-element="pages-container"></div>
    `;
  }
};
