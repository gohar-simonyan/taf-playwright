const UserDataHandler = require('../../data_handlers/user_data_handler');
const MockServer = require('../mock_server/mock_server');

describe('UserDataHandler.loadUsers', () => {
    let userDataHandler;
    let mockServer;

    beforeEach(() => {
        userDataHandler = new UserDataHandler();
        mockServer = new MockServer();
    });

    it('Should populate the users array with data when API call is successful', async () => {
        const mockData = { data: [{ email: 'user1@test.com' }, { email: 'user2@test.com' }] };
        mockServer.mockGet(200, mockData);
        await userDataHandler.loadUsers();
        expect(userDataHandler.users).toEqual(mockData);
    });

    it('Should throw an error when the API call fails', async () => {
        mockServer.mockGet(500);
        try {
            await userDataHandler.loadUsers();
        } catch (error) {
            expect(error.message).toBe('Failed to load users data: Error: Request failed with status code 500');
        }
    });

    it('Should set the users array to an empty array when the API response is empty', async () => {
        const mockData =  [];
        mockServer.mockGet(200, mockData);
        await userDataHandler.loadUsers();
        expect(userDataHandler.users).toEqual([]);
    });
});
