import ApiClient from './apiClient.js';
import ApiClientFetch from './apiClientFetch.js';

export class ApiFactory {
    static getApiInstance(apiClientName) {
        switch (apiClientName) {
            case 'axios':
                return new ApiClient(false);
            case 'fetch':
                return new ApiClientFetch(false);
            case 'demo':
                return new ApiClient(true);
            default:
                throw new Error(`Unknown API Client ${apiClientName}.`);
        }
    }
}
