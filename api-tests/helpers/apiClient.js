import axios from 'axios';
import {config} from '../config/environments.js';
import {handleAxiosError} from '../utils/handleErrors.js';

export default class ApiClient {
    constructor(useDemo = false) {
        this.client = axios.create({
            baseURL: useDemo ? `${config.BASE_URL}demo/${config.PROJECT_NAME}` : `${config.BASE_URL}${config.PROJECT_NAME}`,
            headers: {
                Authorization: `Bearer ${config.TOKEN}`
            },
        });
    }

    async get(path) {
        try {
            return await this.client.get(path);
        } catch (error) {
            handleAxiosError(error);
        }
    }

    async post(path, body) {
        try {
            return await this.client.post(path, body);
        } catch (error) {
            handleAxiosError(error);
        }
    }

    async put(path, body) {
        try {
            return await this.client.put(path, body);
        } catch (error) {
            handleAxiosError(error);
        }
    }

    async delete(path) {
        try {
            return await this.client.delete(path);
        } catch (error) {
            handleAxiosError(error);
        }
    }
}

