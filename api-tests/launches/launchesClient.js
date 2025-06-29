import ApiClient from '../helpers/apiClient.js';
import ApiClientFetch from '../helpers/apiClientFetch.js';
import {compile} from 'path-to-regexp';
import {isEmpty} from '../utils/launches.js';

export default class LaunchesClient {
    get = compile('launch/:launchId');
    update = compile('launch/:launchId/update');

    constructor() {
        this.apiClient = new ApiClient();
        this.apiClientfetch = new ApiClientFetch();
        this.demoApiClient = new ApiClient(true);
    }

    async generateLaunches() {
        await this.demoApiClient.post('generate', {
            createDashboard: false
        });
    }

    async getLaunches() {
        const launches = await this.apiClient.get('launch');
        if(isEmpty(launches)) {
            throw new Error('Launches not found');
        } return launches;
    }

    async getLaunchesFetch() {
        const launches = await this.apiClientfetch.get('launch');
        if(isEmpty(launches)) {
            throw new Error('Launches not found');
        } return launches;
    }

    async getLaunchById(launchId) {
        return await this.apiClient.get(this.get({ launchId }));
    }

    async updateLaunch(launchId, body) {
        await this.apiClient.put(this.update({ launchId }), body);
    }

    async deleteLaunchById(launchId) {
        await this.apiClient.delete(this.get({ launchId }));
    }

    getLaunchIds(launches) {
        return launches?.data?.content?.map((obj) => obj.id);
    }

    getLaunchIdByIndex(launches, index) {
        if(launches.data.content[index]) {
            return launches.data.content[index]?.id.toString();
        }
        throw new Error('Index is not valid');
    }
}