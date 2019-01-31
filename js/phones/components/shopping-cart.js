import Component from '../../component.js';

export default class ShoppingCart extends Component {
  constructor({ element, onDecrease }) {
    super({ element });

    this._element = element;

    this._itemsCount = {};

    this._onDecrease = onDecrease;

    this._render(this._itemsCount);

    this.on('click', '[data-element="decrease-item-qty-btn"]', (event, itemToDecrease) => {
      this._onDecrease(itemToDecrease);
    })
  }

  _render(cartItemsList) {

    this._element.innerHTML = `
      <p>Shopping Cart</p>
      <ul data-element="shop-items-container">
      
        ${
          Object.keys(cartItemsList)
            .map(cartItem => 
              `<li data-element="item-in-cart" 
                   
               >
                 ${cartItem} ${(cartItemsList[cartItem] === 1) ? '' : `
                   <span data-element="cart-item-qty">
                     (${cartItemsList[cartItem]})
                   </span>`}
                 <span 
                   data-element="decrease-item-qty-btn"
                   data-decrease-name="${cartItem}"
                 >
                   [ - ]
                 </span>
               </li>`
        ).join('') || '<span data-element="empty-cart-label">Your cart is empty</span>'}

      </ul>
      `;
  }
}