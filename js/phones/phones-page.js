import PhonesCatalogue from './components/phones-catalogue.js';
import PhoneViewer from './components/phone-viewer.js';
import PhoneService from './services/phone-service.js';
import ShoppingCart from './components/shopping-cart.js';
import Sort from './components/sort-select.js';
import Component from '../component.js';

export default class PhonesPage extends Component{
  constructor({ element }) {
    super({ element });

    this._element = element;

    this._render();

    this._initCatalogue();

    this._initViewer();

    this._initSort();

    this._initCart();
  }

  _initCatalogue() {
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

        let phoneName = phoneInfo.name;

        let cartItemsList = this._cart._itemsCount;

        if (!cartItemsList.hasOwnProperty(phoneName)) {
          cartItemsList[phoneName] = 1;
        } else {
          cartItemsList[phoneName] += 1;
        }

        this._cart._render(cartItemsList);
      },
    });
  }

  _initViewer() {
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

      onAdd: (addToCartBtn) => {
        let cartItemsList = this._cart._itemsCount;

        let nameToAdd = addToCartBtn.dataset.addName;

        if (!cartItemsList.hasOwnProperty(nameToAdd)) {
          cartItemsList[nameToAdd] = 1;
        } else {
          cartItemsList[nameToAdd] += 1;
        }

        this._cart._render(cartItemsList);
      },
    });
  }

  _initSort() {
    this._sort = new Sort({
      element: document.querySelector('[data-component="sort-select"]'),
      onChange: (dropDown) => {
        if (dropDown.value === 'name') {
          this._catalogue._phones.sort((a, b) => (a.name < b.name) ?  -1 : (a.name > b.name) ? 1 : 0);
          this._catalogue._render();
        } else if (dropDown.value === 'age') {
          this._catalogue._phones.sort((a, b) => a.age - b.age);
          this._catalogue._render();
        }
      },
    });
  }

  _initCart() {
    this._cart = new ShoppingCart({
      element: document.querySelector('[data-component="shopping-cart"]'),
      onDecrease: (itemToDecrease) => {

        let cartItemsList = this._cart._itemsCount;

        let nameToDecrease = itemToDecrease.dataset.decreaseName;

        if (cartItemsList[nameToDecrease] > 1) {
          cartItemsList[nameToDecrease] -= 1;
        } else {
          delete cartItemsList[nameToDecrease];
        }

        this._cart._render(cartItemsList);
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
    
          <div data-component="sort-select"></div>
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