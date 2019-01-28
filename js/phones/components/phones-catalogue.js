export default class PhonesCatalogue {
  constructor({ element, phones = [1, 2, 3] }) {
    this._element = element;
    this._phones = phones;

    this._render();
  }

  _render() {
    this._element.innerHTML = `
      ${this._phones.map(el => `
        <ul class="phones">
          <li class="thumbnail">
            <a href="#!/phones/motorola-xoom-with-wi-fi" class="thumb">
              <img alt="Motorola XOOM™ with Wi-Fi" src="img/phones/motorola-xoom-with-wi-fi.0.jpg">
            </a>
  
            <div class="phones__btn-buy-wrapper">
              <a class="btn btn-success">
                Add
              </a>
            </div>
  
            <a href="#!/phones/motorola-xoom-with-wi-fi">Motorola XOOM™ with Wi-Fi</a>
            <p>The Next, Next Generation
  
              Experience the future with Motorola XOOM with Wi-Fi, the world's first tablet powered by Android 3.0 (Honeycomb).</p>
          </li>
        </ul>
      `).join('')}
    `;
  }
};
