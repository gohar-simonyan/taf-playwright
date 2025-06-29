import { config } from '../config/environments.js';

export default class ApiClientFetch {
    constructor(useDemo = false) {
        this.baseURL = useDemo
            ? `${config.BASE_URL}demo/${config.PROJECT_NAME}`
            : `${config.BASE_URL}${config.PROJECT_NAME}`;
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
        const response = await fetch(`${this.baseURL}${path}`, options);

        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
        }
        return await response.json();
    }

    async get(path) {
        return await this.request(path, 'GET');
    }

    async post(path, body) {
        return await this.request(path, 'POST', body);
    }

    async put(path, body) {
        return await this.request(path, 'PUT', body);
    }

    async delete(path) {
        return await this.request(path, 'DELETE');
    }
}