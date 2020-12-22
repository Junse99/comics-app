const apiUrl = 'http://localhost:4000'
export class Api {

  post(url, data, formData) {
    let dataBody

    if (formData) {
      dataBody = new FormData();
      Object.keys(data).map(key => {

        if (!Array.isArray(data[key])) {
          const isFile = data[key] && data[key].size
          const isJson = typeof data[key] === 'object'

          dataBody.append(key, isFile || !isJson ? data[key] : JSON.stringify(data[key]));
        } else
          data[key].forEach(item => {
            const isFile = item && item.size
            const isJson = typeof item === 'object'

            dataBody.append(key, isFile || !isJson ? item : JSON.stringify(item))
          })
      })
    } else
      dataBody = JSON.stringify(data);

    return fetch(`${apiUrl}${url}`, {
      method: 'POST',
      headers: (formData ? {
      } : {
          'Accept': 'application/json',
          'Content-type': 'application/json',
        }),
      body: dataBody
    }).then(async response => {
      response.payload = await response.json()
      return response;
    }).catch(err => err)
  }

  put(url, data, formData) {
    let dataBody

    if (formData) {
      dataBody = new FormData();
      Object.keys(data).map(key => {

        if (!Array.isArray(data[key])) {
          const isFile = data[key] && data[key].size
          const isJson = typeof data[key] === 'object'

          dataBody.append(key, isFile || !isJson ? data[key] : JSON.stringify(data[key]));
        } else
          data[key].forEach(item => {
            const isFile = item && item.size
            const isJson = typeof item === 'object'

            dataBody.append(key, isFile || !isJson ? item : JSON.stringify(item))
          })
      })
    } else
      dataBody = JSON.stringify(data);

    return fetch(`${apiUrl}${url}`, {
      method: 'PUT',
      headers: (formData ? {
      } : {
          'Accept': 'application/json',
          'Content-type': 'application/json'
        }),
      body: dataBody
    }).then(async response => {
      response.payload = await response.json()
      return response;
    }).catch(err => err)
  }

  delete(url) {
    return fetch(`${apiUrl}${url}`, {
      method: 'DELETE'
    }).then(async response => {
      response.payload = await response.json()
      return response;
    }).catch(err => err)
  }

  get(url, params) {
    url = new URL(`${apiUrl}${url}`);
    if (params)
      Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
    return fetch(url, {
      method: 'GET'
    }).then(async response => {
      response.payload = await response.json()
      return response;
    }).catch(err => err)
  }
}

export default new Api();
/* const APIKEY = '773775ed8a73552dd5ed8218eaa9ade3';
const HASH = '120d31ac8b01c3c66e008ac151f852b2';
const TS = '4';
const BASEURL = 'http://gateway.marvel.com/v1/public/comics?';

export const Api = () => fetch('http://localhost:4000/comic/all/'
/*     BASEURL + new URLSearchParams({
        apikey  : APIKEY,
        hash    : HASH,
        ts      : TS
    })
    ).then(resp => resp.json())
    .then(json => json)
    .catch(err => console.log("Ocurrió un error")); */


/* const params = [
    { name: 'ts', value: TS },
    { name: 'apikey', value: API_KEY },
    { name: 'hash', value: HASH }
  ];
  
  export const Api = async () => {
    let a = '?';
    params.map(i => {
      a = a + `&${i.name}=${i.value}`
    })
    return await fetch(BASE_URL + a)
  }; */




//const apiKey = 'http://gateway.marvel.com/v1/public/comics?ts=4&apikey=773775ed8a73552dd5ed8218eaa9ade3&hash=120d31ac8b01c3c66e008ac151f852b2';


