import PhonesCatalogue from './components/phones-catalogue.js';
import PhoneViewer from './components/phone-viewer.js';
import PhoneService from './services/phone-service.js';
import ShoppingCart from './components/shopping-cart.js';
import Sort from './components/sort-select.js';
import Filter from './components/search-filter.js';
import Component from '../component.js';

export default class PhonesPage extends Component{
  constructor({ element }) {
    super({ element });
    this._element = element;

    this._render();

    this._initCatalogue();
    this._initViewer();
    this._initFilter();
    this._initSort();
    this._initCart();
  }

  _initCatalogue() {
    this._catalogue = new PhonesCatalogue({
      element: document.querySelector('[data-component="phones-catalogue"]'),
    });

    this._catalogue.subscribe('select-phone', (phoneId) => {
      this._catalogue.hide();
      this._viewer.show(phoneId);
    });

    this._catalogue.subscribe('add-from-catalogue', (event) => {
      let currentPhone = event.target.closest('[data-element="phone-in-list"]');
      let phoneId = currentPhone.dataset.phoneId;

      PhoneService.getById(phoneId, (phoneInfo) => {
        let phoneName = phoneInfo.name;
        let cartItemsList = this._cart._itemsCount;

        if (!cartItemsList.hasOwnProperty(phoneName)) {
          cartItemsList[phoneName] = 1;
        } else {
          cartItemsList[phoneName] += 1;
        }

        this._cart._render(cartItemsList);
      });
    });
  }

  _initViewer() {
    this._viewer = new PhoneViewer({
      element: document.querySelector('[data-component="phone-viewer"]'),
    });

    this._viewer.subscribe('back-button', () => {
      this._catalogue.show();
      this._viewer.hide();
    });

    this._viewer.subscribe('add-from-viewer', (addToCartBtn) => {
      let cartItemsList = this._cart._itemsCount;
      let nameToAdd = addToCartBtn.dataset.addName;

      if (!cartItemsList.hasOwnProperty(nameToAdd)) {
        cartItemsList[nameToAdd] = 1;
      } else {
        cartItemsList[nameToAdd] += 1;
      }

      this._cart._render(cartItemsList);
    });

    this._viewer.subscribe('set-gallery-preview', (imageSelected) => {
      let imgPreviewElement = this._element.querySelector('[data-element="image-preview"]');
      imgPreviewElement.src = imageSelected.src;
    });
  }

  _initFilter() {
    this._filter = new Filter({
      element: document.querySelector('[data-component="search-filter"]'),
    });

    this.inputAnalyser = (inputItem) => {
      if (this._filter._isInputClearBeforeFiltering) {
        this._filter._cachedPhones = this._catalogue.getCataloguePhones();
        this._filter._isInputClearBeforeFiltering = false;
      }

      this._catalogue.setCataloguePhones([...this._filter._cachedPhones]);
      let reg = new RegExp(inputItem.value, 'i');
      let filteredPhonesList = this._catalogue.getCataloguePhones().filter(phonesObj => reg.test(phonesObj.name));
      this._catalogue.setCataloguePhones(filteredPhonesList);
      this._catalogue.refresh();

      if (inputItem.value === '') {
        this._filter._isInputClearBeforeFiltering = true;
      }
    };

    this._filter.subscribe('on-input-change', (inputItem) => {
      this.inputAnalyser(inputItem);
    });
  }

  _initSort() {
    this._sort = new Sort({
      element: document.querySelector('[data-component="sort-select"]'),
    });

    this.sortFunc = (sortBy) => {
      return (a, b) => {
        return (a[sortBy] < b[sortBy]) ? -1 : 1;
      }
    };

    this._sort.subscribe('sort-type-changed', (dropDown) => {
      if (dropDown.value === 'name') {
        let sortedByName = this._catalogue.getCataloguePhones().sort(this.sortFunc('name'));
        this._catalogue.setCataloguePhones(sortedByName);

        if (this._filter.getCachedPhones()) {
          let syncedSortWithFiltering = this._filter.getCachedPhones().sort(this.sortFunc('name'));
          this._filter.setCachedPhones(syncedSortWithFiltering);
        }

        this._catalogue.refresh();

      } else if (dropDown.value === 'age') {
        let sortedByAge = this._catalogue.getCataloguePhones().sort(this.sortFunc('age'));
        this._catalogue.setCataloguePhones(sortedByAge);

        if (this._filter.getCachedPhones()) {
          let syncedSortWithFiltering = this._filter.getCachedPhones().sort(this.sortFunc('age'));
          this._filter.setCachedPhones(syncedSortWithFiltering);
        }

        this._catalogue.refresh();
      }

    })
  }

  _initCart() {
    this._cart = new ShoppingCart({
      element: document.querySelector('[data-component="shopping-cart"]'),
    });

    this._cart.subscribe('decrease-item', (itemToDecrease) => {
      let cartItemsList = this._cart._itemsCount;
      let nameToDecrease = itemToDecrease.dataset.decreaseName;

      if (cartItemsList[nameToDecrease] > 1) {
        cartItemsList[nameToDecrease] -= 1;
      } else {
        delete cartItemsList[nameToDecrease];
      }

      this._cart._render(cartItemsList);
    })
  }

  _render() {
    this._element.innerHTML = `
      <div class="row">

        <!--Sidebar-->
        <div class="col-md-2">
          <section>
          
            <div data-component="search-filter"></div>
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
};
