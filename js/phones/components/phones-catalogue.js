import Component from '../../component.js';
import PhoneService from '../services/phone-service.js';

export default class PhonesCatalogue extends Component {
  constructor({ element }) {
    super({ element });
    this._element = element;

    PhoneService.getPhones((phones) => {
      this._phones = phones;
      this._render();
    });

    this.on('click', 'add-button', (event) => {
      this.emit('add-from-catalogue', event);
    });
    this.on('click', 'phone-selected',  (event, phoneSelectedElement) => {
      let phoneId = phoneSelectedElement.closest('[data-element="phone-in-list"]').dataset.phoneId;

      this.emit('select-phone', phoneId);
    })
  }

  getCataloguePhones() {
    return [...this._phones];
  }

  setCataloguePhones(phonesArr) {
    this._phones = [...phonesArr];
  }

  refresh() {
    this._render();
  }

  _render() {
    this._element.innerHTML = `
      <ul class="phones">
      
        ${
          this._phones.map(phone => `
            <li 
              data-element="phone-in-list"
              data-phone-id="${phone.id}"
              class="thumbnail"
            >
              <a 
                data-element="phone-selected"
                href="#!/phones/${phone.id}"
                class="thumb"
              >
                <img 
                  alt="${phone.name}"
                  src="${phone.imageUrl}"
                >
              </a>
      
              <div class="phones__btn-buy-wrapper">
                <a data-element="add-button" class="btn btn-success">
                  Add
                </a>
              </div>
      
              <a 
                data-element="phone-selected"
                href="#!/phones/${phone.id}">${phone.name}</a>
              <p>${phone.snippet}</p>
            </li>
          `).join('')
        }
       
      </ul>
    `;
  }
};
