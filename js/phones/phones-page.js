import PhonesCatalogue from './components/phones-catalogue.js';
import PhoneViewer from './components/phone-viewer.js';
import PhoneService from './services/phone-service.js';
import ShoppingCart from './components/shopping-cart.js';
import Component from '../component.js';

export default class PhonesPage extends Component{
  constructor({ element }) {
    super({ element });

    this._element = element;

    this._render();

    this._catalogue = new PhonesCatalogue({
      element: document.querySelector('[data-component="phones-catalogue"]'),
      phones: PhoneService.getPhones(),
      onSelect: (event, phoneId) => {
        this._catalogue.hide();
        this._viewer.show();
        this._viewer._render(phoneId);
      },

      onAdd: (event) => {
        let currentPhone = event.target.closest('[data-element="phone-in-list"]');
        let phoneId = currentPhone.dataset.phoneId;

        let phoneInfo = PhoneService.getPhones().filter(phone => phone.id === phoneId)[0];

        let cartContainer = document.querySelector('[data-element="shop-items-container"]');

        let emptyLabel = document.querySelector('[data-element="empty-label"]');

        if (cartContainer.contains(emptyLabel)) {
          emptyLabel.hidden = true;
        }

        cartContainer.insertAdjacentHTML('beforeend',
          `<li 
            data-element="item-in-cart"
            data-phone-id="${phoneId}"
           >
            ${phoneInfo.name} 
            <span data-element="remove-from-cart">[x]</span>
           </li>`);
      },
    });

    this._viewer = new PhoneViewer({
      element: document.querySelector('[data-component="phone-viewer"]'),
      phonesDetails: PhoneService.getById,

      onSetPreview: (imageSelected) => {
        let imgPreviewElement = this._element.querySelector('[data-element="image-preview"]');

        imgPreviewElement.src = imageSelected.src;
      },

      onBack: () => {
        this._catalogue.show();
        this._viewer.hide();
      },

    });

    this._cart = new ShoppingCart({
      element: document.querySelector('[data-component="shopping-cart"]'),
      onRemove: (itemToRemove) => {
        itemToRemove.remove();

        let itemsContainer = document.querySelector('[data-element="shop-items-container"]');
        let emptyLabel = document.querySelector('[data-element="empty-label"]');
        
        if (itemsContainer.lastElementChild === emptyLabel) {
          emptyLabel.hidden = false;
        }
      },
    })
  }

  _render() {
    this._element.innerHTML = `
      <div class="row">

        <!--Sidebar-->
        <div class="col-md-2">
          <section>
            <p>
              Search:
              <input>
            </p>
    
            <p>
              Sort by:
              <select>
                <option value="name">Alphabetical</option>
                <option value="age">Newest</option>
              </select>
            </p>
          </section>
    
          <section>
            <div data-component="shopping-cart"></div>
          </section>
        </div>
    
        <!--Main content-->
        <div class="col-md-10">
          
          <div data-component="phones-catalogue"></div>
          <div data-component="phone-viewer"></div>
              
        </div>
      </div>
    `;
  }
}