import PhonesCatalogue from './components/phones-catalogue.js';
import PhoneViewer from './components/phone-viewer.js';
import PhoneService from './services/phone-service.js';
import ShoppingCart from './components/shopping-cart.js';
import Sort from './components/sort-select.js';
import Filter from './components/search-filter.js';
import PaginationFilter from './components/pagination-filter.js';
import Component from '../component.js';

export default class PhonesPage extends Component{
  constructor({ element }) {
    super({ element });
    this._element = element;

    this._render();

    this._initPagination();
    this._initCart();
    this._initSort();
    this._initFilter();
    this._initViewer();
    this._initCatalogue();
  }

  _initCatalogue() {
    this._catalogue = new PhonesCatalogue({
      element: document.querySelector('[data-component="phones-catalogue"]'),
    });

    PhoneService.getPhones((phones) => {
      this._catalogue._phones = phones;
      this._catalogue.refresh();

      let pagesDropdown = document.querySelector('[data-element="page-items-qty-dropdown"]');
      this._pagination.renderPages(+pagesDropdown.value);
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
        let cartItemsList = this._cart.getItemsCount();

        if (!cartItemsList.hasOwnProperty(phoneName)) {
          cartItemsList[phoneName] = 1;
        } else {
          cartItemsList[phoneName] += 1;
        }

        this._cart.refresh(cartItemsList);
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

      this._cart.refresh(cartItemsList);
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

      let pagesDropdown = document.querySelector('[data-element="page-items-qty-dropdown"]');
      this._pagination.renderPages(+pagesDropdown.value);

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
        let sortedBy = this._catalogue.getCataloguePhones().sort(this.sortFunc(dropDown.value));
        this._catalogue.setCataloguePhones(sortedBy);

        if (this._filter.getCachedPhones()) {
          let syncedSortWithFiltering = this._filter.getCachedPhones().sort(this.sortFunc(dropDown.value));
          this._filter.setCachedPhones(syncedSortWithFiltering);
        }

        let pagesDropdown = document.querySelector('[data-element="page-items-qty-dropdown"]');
        this._catalogue.refresh();
        this._pagination.renderPages(+pagesDropdown.value);
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

  _initPagination() {
    this._pagination = new PaginationFilter({
      element: document.querySelector('[data-component="pagination-filter"]'),
    });

    this._pagination.renderPages = (elemsOnPage) => {
      this._catalogue.refresh(0, elemsOnPage);
      let pagesContainer = this._pagination._element.querySelector('[data-element="pages-container"]');
      let pagesQty = Math.ceil(this._catalogue.getCataloguePhones().length/elemsOnPage);
      let pagesArr = [];
      for (let i=1; i<=pagesQty; i++) {
        pagesArr.push(i);
      }
      pagesContainer.innerHTML = `
            ${pagesArr.map(pageNumber => `
              <span 
                ${(pageNumber === 1) ? 'class="current-page"' : ''}
                data-items-from="${pageNumber * elemsOnPage - elemsOnPage}"
                data-items-to="${pageNumber * elemsOnPage}" 
                data-element="page-number"
              >
                ${pageNumber}
              </span>`).join('')}
          `;
    };

    this._pagination.subscribe('page-items-qty-changed', (dropDown) => {
      this._pagination.renderPages(+dropDown.value);
    });

    this._pagination.subscribe('page-selected', (pageNumber) => {
      let pagesContainer = pageNumber.parentElement;
      for (let pageEl of pagesContainer.children) {
        if (pageEl.classList.contains('current-page')) {
          pageEl.classList.remove('current-page');
        }
      }
      pageNumber.classList.add('current-page');

      let from = pageNumber.dataset.itemsFrom;
      let to = pageNumber.dataset.itemsTo;
      this._catalogue.refresh(from, to);
    });

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
          <div data-component="pagination-filter"></div>
          <div data-component="phones-catalogue"></div>
          <div data-component="phone-viewer"></div>
              
        </div>
      </div>
    `;
  }
};
