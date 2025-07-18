export const launchSchema = {
    'type': 'object',
    'properties': {
    'content': {
        'type': 'array',
            'items': {
            'type': 'object',
                'properties': {
                'owner': { 'type': 'string' },
                'description': { 'type': 'string' },
                'id': {
                    'type': 'integer',
                        'minimum': -9007199254740991,
                        'maximum': 9007199254740991
                },
                'uuid': { 'type': 'string' },
                'name': { 'type': 'string' },
                'number': {
                    'type': 'integer',
                        'minimum': -9007199254740991,
                        'maximum': 9007199254740991
                },
                'startTime': { 'type': 'string' },
                'endTime': { 'type': 'string' },
                'lastModified': { 'type': 'string' },
                'status': { 'type': 'string' },
                'statistics': {
                    'type': 'object',
                        'properties': {
                        'executions': {
                            'type': 'object',
                                'patternProperties': {
                                '^.*$': { 'type': 'integer' }
                            },
                            'additionalProperties': false
                        },
                        'defects': {
                            'type': 'object',
                                'patternProperties': {
                                '^.*$': {
                                    'type': 'object',
                                        'patternProperties': {
                                        '^.*$': { 'type': 'integer' }
                                    },
                                    'additionalProperties': false
                                }
                            },
                            'additionalProperties': false
                        }
                    },
                    'additionalProperties': false
                },
                'attributes': {
                    'type': 'array',
                        'items': {
                        'type': 'object',
                            'properties': {
                            'key': { 'type': 'string' },
                            'value': { 'type': 'string' }
                        },
                        'required': ['key', 'value']
                    }
                },
                'mode': { 'type': 'string', 'enum': ['DEFAULT'] },
                'analysing': {
                    'type': 'array',
                        'items': { 'type': 'string' }
                },
                'approximateDuration': { 'type': 'number' },
                'hasRetries': { 'type': 'boolean' },
                'rerun': { 'type': 'boolean' },
                'metadata': {
                    'type': 'object'
                },
                'retentionPolicy': { 'type': 'string' }
            },
            'required': [
                'owner',
                'description',
                'id',
                'uuid',
                'name',
                'number',
                'startTime',
                'endTime',
                'lastModified',
                'status',
                'statistics',
                'attributes',
                'mode',
                'analysing',
                'approximateDuration',
                'hasRetries',
                'rerun',
                'metadata',
                'retentionPolicy'
            ]
        }
    },
    'page': {
        'type': 'object',
            'properties': {
            'number': {
                'type': 'integer',
                    'minimum': -9007199254740991,
                    'maximum': 9007199254740991
            },
            'size': {
                'type': 'integer',
                    'minimum': -9007199254740991,
                    'maximum': 9007199254740991
            },
            'totalElements': {
                'type': 'integer',
                    'minimum': -9007199254740991,
                    'maximum': 9007199254740991
            },
            'totalPages': {
                'type': 'integer',
                    'minimum': -9007199254740991,
                    'maximum': 9007199254740991
            },
            'hasNext': { 'type': 'boolean' }
        },
        'required': ['number', 'size', 'totalElements', 'totalPages']
    }
},
    'required': ['content', 'page'],
    'additionalProperties': false
};