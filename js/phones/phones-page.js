import PhonesCatalogue from './components/phones-catalogue.js';
import PhoneViewer from './components/phone-viewer.js';

export default class PhonesPage {
  constructor({ element }) {
    this._element = element;

    this._render();

    this._catalogue = new PhonesCatalogue({
      element: document.querySelector('[data-component="phones-catalogue"]')
    })

    this._viewer = new PhoneViewer({
      element: document.querySelector('[data-component="phone-viewer"]')
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
};
