import { expect } from "chai";
import ApiClient from '../helpers/apiClient';
import {validateSchema} from "../utils/schemaValidator";
import {launchSchema} from "../schemas/launch.schema";

describe('Check launch apis', () => {
    let apiClient;

    before(() => {
        apiClient = new ApiClient();
    });

    it('Check launch schema', async function() {
        const response = await apiClient.get('launch');
        const isValid = validateSchema(response.data, launchSchema)
        expect(isValid).to.equal(true);
    })
})

