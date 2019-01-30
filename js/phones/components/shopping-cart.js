import Component from '../../component.js';

export default class ShoppingCart extends Component {
  constructor({ element, onRemove }) {
    super({ element });

    this._element = element;

    this._render();

    this._element.addEventListener('click', onRemove);
  }

  _render() {
    this._element.innerHTML = `
      <p>Shopping Cart</p>
      <ul data-element="shop-items-container">
        <li data-element="empty-label">No items in cart...</li>
      </ul>
    `;
  }
}