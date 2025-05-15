import ApiClient from '../helpers/apiClient.js';
import logger from '../utils/logger.js';
import {compile} from 'path-to-regexp';

export default class LaunchesClient {
    getLaunchByIdEndpoint = compile('launch/:launchId');
    updateLaunchEndpoint = compile('launch/:launchId/update');

    constructor() {
        this.apiClient = new ApiClient();
    }

    async getLaunches() {
        const launches = await this.apiClient.get('launch');
        if(this.checkLaunchesIsEmpty(launches)) {
            logger.error('Launches not found');
            return;
        } return launches;
    }

    async getLaunchById(launchId) {
        return await this.apiClient.get(this.getLaunchByIdEndpoint({ launchId }));
    }

    async updateLaunch(launchId, body) {
        await this.apiClient.put(this.updateLaunchEndpoint({ launchId }), body);
    }

    async deleteLaunchById(launchId) {
        await this.apiClient.delete(this.getLaunchByIdEndpoint({ launchId }));
    }

    getLaunchIds(launches) {
        if(this.checkLaunchesIsEmpty(launches)) {
            logger.error('Launches is empty');
            return;
        }
        return launches.data.content.map((obj) => obj.id);
    }

    getLaunchIdByIndex(launches, index) {
        if(this.checkLaunchesIsEmpty(launches)) {
            logger.error('Launches is empty');
            return;
        } else if(index > launches.data.content.length) {
            logger.error('Launch id is not valid');
            return;
        }
        return launches.data.content[index].id.toString();
    }

     checkLaunchesIsEmpty(launches) {
         return Array.isArray(launches.data.content) && launches.data.content.length === 0;
     }
}