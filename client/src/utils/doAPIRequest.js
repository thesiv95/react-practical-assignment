import axios from 'axios'

const baseURL = 'http://localhost:8080' // change here if required

/**
 * One wrapper for sending requests to backend and getting response from it
 * @param {string} route path to route (baseURL not required), should be started from / 
 * @param {string} method HTTP method, get by default
 * @param {object} body payload if needed
 */
const doAPIRequest = async (route, method = 'get', body = null) => {
    try {
        const response = await axios.request({
            baseURL,
            url: route,
            method,
            data: body,
        })

        console.log(`
API Request
=========================
route: ${route}
method: ${method}
body: ${body ? JSON.stringify(body) : '(no body)'}
        `)
    
        return response.data
    } catch (error) {
        console.error('API Request ' + error)
    }
}

export default doAPIRequest