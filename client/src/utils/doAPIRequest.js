import axios from 'axios';

const baseURL = 'http://localhost:8080'; // change here if required

/**
 * One wrapper for sending requests to backend and getting response from it
 * @param {string} route path to route (baseURL not required), should be started from / 
 * @param {string} method HTTP method, get by default
 * @param {object} body payload if needed
 */
const doAPIRequest = async (route, method = 'get', body = null) => {

    const response = await axios.request({
        baseURL,
        url: route,
        method,
        data: body,
    })

    return response.data;
}

export default doAPIRequest;