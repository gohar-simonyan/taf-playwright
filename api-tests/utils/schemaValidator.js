import Ajv from 'ajv';

export function validateSchema(data, schema) {
        const ajv = new Ajv();
        const validate = ajv.compile(schema);
        const valid = validate(data);
        return valid;
}


