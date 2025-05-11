import { expect } from 'chai';
import ApiClient from '../helpers/apiClient.js';
import {validateSchema} from '../utils/schemaValidator.js';
import {launchSchema} from '../schemas/launch.schema.js';

describe('Check launch apis', function() {
    let apiClient;

    before(function() {
        apiClient = new ApiClient();
    });

    it('Check launch schema', async function() {
        const response = await apiClient.get('launch');
        const errors = validateSchema(response.data, launchSchema);
        expect(errors).to.deep.equal([]);
    });

    it('Check updating launch functionality', async function() {
        const launches = await apiClient.get('launch');
        const launchId = launches.data.content[0].id;
        const body = {
            'description': 'test launch description',
        };
        await apiClient.put(`launch/${launchId}/update`, body);
        const updatedLaunch = await apiClient.get(`launch/${launchId}`);
        expect(updatedLaunch.data.description).to.equal(body.description);
    });

    it('Check deleting launch functionality', async function() {
        const launches = await apiClient.get('launch');
        const launchId = launches.data.content[0].id;
        await apiClient.delete(`launch/${launchId}`);
        const updatedLaunches = await apiClient.get('launch');
        const ids = updatedLaunches.data.content.map((obj) => obj.id);
        expect(ids).to.not.include(launchId);
    });
});

