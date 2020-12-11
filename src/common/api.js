
const APIKEY = '773775ed8a73552dd5ed8218eaa9ade3';
const HASH = '120d31ac8b01c3c66e008ac151f852b2';
const TS = '4';
const BASEURL = 'http://gateway.marvel.com/v1/public/comics?';

export const Api = () => fetch(
    BASEURL + new URLSearchParams({
        apikey  : APIKEY,
        hash    : HASH,
        ts      : TS
    }))
.then(resp => resp.json())
.then(json => json)
.catch(err => console.log("Ocurrió un error"));


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


