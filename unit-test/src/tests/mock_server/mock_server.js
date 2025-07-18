const nock = require('nock');

class MockServer {
    constructor() {
        this.baseURL = 'http://localhost:3000';
        this.endpoint = '/users';
        nock.cleanAll();
    }

    mockGet(statusCode = 200, data = {}) {
        nock(this.baseURL).get(this.endpoint).reply(statusCode, data);
    }
}

module.exports = MockServer;
