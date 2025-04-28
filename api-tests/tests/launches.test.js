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
});

