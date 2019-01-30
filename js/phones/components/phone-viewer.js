import Component from '../../component.js';

export default class PhoneViewer extends Component {
  constructor({ element, phoneDetails, onSetPreview = () => {}, onBack = () => {}, }) {
    super({ element });

    this._element = element;
    this._phoneDetails = phoneDetails;

    this._onSetPreview = onSetPreview;
    this._onBack = onBack;


    this.on('click', '[data-element="image-selected"]', (event, imageSelected) => {
      this._onSetPreview(imageSelected);
    });

    this.on('click', '[data-element="catalogue-back-btn"]', (event) => {
      this._onBack();
    });

    this._render();
  }

  _render() {
    let phone = this._phoneDetails;

    this._element.innerHTML = `
      <img 
        data-element="image-preview" 
        class="phone" 
        src="${phone.images[0]}"
      >

      <button data-element="catalogue-back-btn">Back</button>
      <button data-element="add-button">Add to basket</button>
  
  
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
}