import Component from '../../component.js';

export default class PhoneViewer extends Component {
  constructor({ element, phonesDetails, }) {
    super({ element });

    this._element = element;
    this._phonesDetails = phonesDetails;

    this.on('click', 'image-selected', (event, imageSelected) => {
      this.emit('set-gallery-preview', imageSelected);
    });

    this.on('click', 'catalogue-back-btn', () => {
      this.emit('back-button');
    });

    this.on('click', 'add-from-viewer-button', (event, addToCartBtn) => {
      this.emit('add-from-viewer', addToCartBtn);
    });
  }

  _render(phoneId) {
    let phone = this._phonesDetails(phoneId);

    this._element.innerHTML = `
      <img 
        data-element="image-preview" 
        class="phone" 
        src="${phone.images[0]}"
      >

      <button data-element="catalogue-back-btn">Back</button>
      <button 
        data-element="add-from-viewer-button" 
        data-add-name="${phone.name}"
      >
        Add to basket
      </button>
  
  
      <h1>${phone.name}</h1>
  
      <p>${phone.description}</p>
  
      <ul class="phone-thumbs">
        ${phone.images.map(image => `
          <li>
            <img 
              data-element="image-selected"
              src="${image}"
            >
          </li>
        `).join('')}
      </ul>
    `;
  }
};
