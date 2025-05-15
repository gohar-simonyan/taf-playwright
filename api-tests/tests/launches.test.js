import { expect } from 'chai';
import ApiClient from '../helpers/apiClient.js';
import LaunchesClient from '../launches/launchesClient.js';
import {validateSchema} from '../utils/schemaValidator.js';
import {launchSchema} from '../schemas/launch.schema.js';

describe('Check launch apis', function() {
    let apiClient;
    let launchesClient;

    before(function() {
        apiClient = new ApiClient();
        launchesClient = new LaunchesClient(apiClient);
    });

    it('Check launch schema', async function() {
        const response = await launchesClient.getLaunches();
        const errors = validateSchema(response.data, launchSchema);
        expect(errors).to.deep.equal([]);
    });

    it('Check updating launch functionality', async function() {
        const launches = await launchesClient.getLaunches();
        const launchId = launchesClient.getLaunchIdByIndex(launches, 0);
        const body = {
            'description': 'test launch description',
        };
        await launchesClient.updateLaunch(launchId, body);
        const updatedLaunch = await launchesClient.getLaunchById(launchId);
        expect(updatedLaunch.data.description).to.equal(body.description);
    });

    it('Check deleting launch functionality', async function() {
        const launches = await launchesClient.getLaunches();
        const launchId = launchesClient.getLaunchIdByIndex(launches, 0);
        await launchesClient.deleteLaunchById(launchId);
        const updatedLaunches = await launchesClient.getLaunches();
        const ids = launchesClient.getLaunchIds(updatedLaunches);
        expect(ids).to.not.include(launchId);
    });
});