/*const CryptoJS = require("crypto-js");

const PRIV_KEY = "2b101cf909b39cb27b679ea471287e2e2ba2aa81";
const PUB_KEY = "e23507931830c9ee423da4a822ea0574";

const ts = Date.now();
const hash = CryptoJS.MD5(ts + PRIV_KEY + PUB_KEY).toString();

const baseUrl = "http://gateway.marvel.com/v1/public";

const params = '?ts=' + ts + '&apikey=' + PUB_KEY + '&hash=' + hash;

function getCharactersURL(baseUrl, params) {
    return baseUrl + '/characters' + params
}

export default {
    getCharactersURL
}
*/
