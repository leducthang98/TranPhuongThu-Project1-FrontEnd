import axios from 'axios';
import { token } from '../domain';

export default (method, url, params = {}, headers = "", responseType) => {
    method = method.toLowerCase();
    let storeData = localStorage.getItem(token);
    let opts = {
        method: method,
        url: url,
        headers: {
            token: storeData ? storeData : '',
            'Access-Control-Allow-Origin': "*"
        }
    };
    if (method === 'get') {
        opts.params = params;
    }
    else { opts.data = params; }

    if (headers) {
        opts.headers = Object.assign(opts.headers, headers);
    }
    if (responseType) {
        opts.responseType = responseType;
    }
    opts.validateStatus = (status) => {
        return true;
    }
    return axios(opts);
}