import Component from '../../component.js';

export default class ShoppingCart extends Component {
  constructor({ element, onRemove }) {
    super({ element });

    this._element = element;

    this._onRemove = onRemove;

    this._render();

    this.on('click', '[data-element="item-in-cart"]', (event, itemToRemove) => {
      this._onRemove(itemToRemove);
    })
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