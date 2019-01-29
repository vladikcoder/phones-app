import PhonesCatalogue from './components/phones-catalogue.js';
import PhoneViewer from './components/phone-viewer.js';
import PhoneService from './services/phone-service.js';


export default class PhonesPage {
  constructor({ element }) {
    this._element = element;

    this._render();

    this._catalogue = new PhonesCatalogue({
      element: document.querySelector('[data-component="phones-catalogue"]'),
      phones: PhoneService.getPhones(),
      onSelect: (event) => {
        let phoneSelected = event.target.closest('[data-element="phone-selected"]');

        if(!phoneSelected) {
          return;
        }

        this._catalogue.hide();
        this._viewer.show();
      },
    });

    this._viewer = new PhoneViewer({
      element: document.querySelector('[data-component="phone-viewer"]'),
      phoneDetails: PhoneService.getById(),
      onSetPreview: (event) => {
        let imageSelected = event.target.closest('[data-element="image-selected"]');

        if(!imageSelected) {
          return;
        }

        let imgPreviewElement = this._element.querySelector('[data-element="image-preview"]');

        imgPreviewElement.src = imageSelected.src;
      },

      onBack: (event) => {
        let backButton = event.target.closest('[data-element="catalogue-back-btn"]');

        if(!backButton) {
          return;
        }

        this._catalogue.show();
        this._viewer.hide();
      },
    });

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
            <p>Shopping Cart</p>
            <ul>
              <li>Phone 1</li>
              <li>Phone 2</li>
              <li>Phone 3</li>
            </ul>
          </section>
        </div>
    
        <!--Main content-->
        <div class="col-md-10">
          
          <div data-component="phones-catalogue"></div>
          <div data-component="phone-viewer" hidden></div>
              
        </div>
      </div>
    `;
  }
}