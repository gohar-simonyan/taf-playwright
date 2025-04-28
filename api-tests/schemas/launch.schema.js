export const launchSchema = {
    type: 'object',
    properties: {
        content: {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    owner: {type: 'string'},
                    description: {type: 'string'},
                    id: {type: 'number'},
                    uuid: {type: 'string'},
                    name: {type: 'string'},
                    number: {type: 'number'},
                    startTime: {type: 'string'},
                    endTime: {type: 'string'},
                    lastModified: {type: 'string'},
                    status: {type: 'string'},
                    statistics: {type: 'object'},
                    attributes: {type: 'array'},
                    mode: {type: 'string'},
                    analysing: {type: 'array'},
                    approximateDuration: {type: 'number'},
                    hasRetries: {type: 'boolean'},
                    rerun: {type: 'boolean'},
                    retentionPolicy: {type: 'string'},
                },
                required: ['owner', 'description', 'id', 'uuid', 'name', 'number', 'startTime', 'endTime', 'lastModified', 'status', 'statistics', 'attributes', 'mode', 'analysing', 'approximateDuration', 'hasRetries', 'rerun', 'retentionPolicy'],
                additionalProperties: false,
            }
        }
    }
};