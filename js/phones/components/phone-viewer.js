export default class PhoneViewer {
  constructor({ element, phoneDetails, onSetPreview, onBack}) {
    this._element = element;
    this._phoneDetails = phoneDetails;

    this._element.addEventListener('click', onSetPreview);
    this._element.addEventListener('click', onBack);
  }

  show() {
    this._render();

    this._element.hidden = false;
  }

  hide() {
    this._element.hidden = true;
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
      <button>Add to basket</button>
  
  
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