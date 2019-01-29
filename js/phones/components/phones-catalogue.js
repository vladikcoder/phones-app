export default class PhonesCatalogue {
  constructor({ element, phones, onSelect }) {
    this._element = element;
    this._phones = phones;

    this._render();

    this._element.addEventListener('click', onSelect);
  }

  hide() {
    this._element.hidden = true;
  }

  show() {
    this._element.hidden = false;
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
                <a class="btn btn-success">
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
}