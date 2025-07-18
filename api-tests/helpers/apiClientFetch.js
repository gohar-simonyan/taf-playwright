import { config } from '../config/environments.js';
import {logApiDetails} from '../utils/logApiDetails.js';

export default class ApiClientFetch {
    constructor(baseUrl) {
        this.baseURL = baseUrl;
        this.headers = {
            Authorization: `Bearer ${config.TOKEN}`
        };
    }

    async request(path, method = 'GET', body = null) {
        const options = {
            method,
            headers: this.headers,
        };
        if (body) {
            options.body = JSON.stringify(body);
        }
        const endpoint = `${this.baseURL}${path}`;
        const response = await fetch(endpoint, options);
        const responseData = await response.json();
        const logLevel = response.ok ? 'info' : 'error';
        logApiDetails(
            logLevel,
            {
                method,
                url: endpoint,
                headers: options.headers,
                body,
            },
            {
                status: response.status,
                headers: response.headers,
                body: responseData,
            }
        );
        return responseData;
    }

    async get(path) {
        return this.request(path, 'GET');
    }

    async post(path, body) {
        return this.request(path, 'POST', body);
    }

    async put(path, body) {
        return this.request(path, 'PUT', body);
    }

    async delete(path) {
        return this.request(path, 'DELETE');
    }
}
