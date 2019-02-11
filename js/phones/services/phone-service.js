const PhoneService = {
  getPhones(callback) {
    let url = 'https://raw.githubusercontent.com/vladikcoder/phones-app/gh-pages/phones/phones.json';
    PhoneService.phonesRequest(callback, url);
  },

  getById(phoneId, callback) {
    let url = `https://raw.githubusercontent.com/vladikcoder/phones-app/gh-pages/phones/${phoneId}.json`;
    PhoneService.phonesRequest(callback, url);
  },

  phonesRequest(callback, url) {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.send();

    xhr.onreadystatechange = () => {
      if (xhr.readyState !== 4) {
        return;
      }

      if (xhr.status !== 200) {
        console.log(`Error ${xhr.status}: ${xhr.statusText}`);
        return;
      }

      callback(JSON.parse(xhr.responseText));
    };
  },
};

export default PhoneService;
