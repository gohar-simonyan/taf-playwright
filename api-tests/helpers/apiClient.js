import axios from "axios";
import {config} from "../config/environments";

export default class ApiClient {
    constructor() {
        this.client = axios.create({
            baseURL: `${config.BASE_URL}${config.PROJECT_NAME}`,
            headers: {
                Authorization: `Bearer ${config.TOKEN}`
            },
        });
    }

    async get(path) {
        try {
            return await this.client.get(path);
        } catch (error) {
            throw error;
        }
    }

    async post(path, body) {
        try {
            return await this.client.post(path, body);
        } catch (error) {
            throw error;
        }
    }

    async put(path, body) {
        try {
            return await this.client.put(path, body);
        } catch (error) {
            throw error;
        }
    }

    async delete(path) {
        try {
            return await this.client.delete(path);
        } catch (error) {
            throw error;
        }
    }
}

