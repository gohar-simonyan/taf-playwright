import ApiClient from './apiClient.js';
import ApiClientFetch from './apiClientFetch.js';

export class ApiFactory {
    static getApiInstance(apiClientName, baseURL) {
        switch (apiClientName) {
            case 'axios':
                return new ApiClient(baseURL);
            case 'fetch':
                return new ApiClientFetch(baseURL);
            default:
                throw new Error(`Unknown API Client ${apiClientName}.`);
        }
    }
}
