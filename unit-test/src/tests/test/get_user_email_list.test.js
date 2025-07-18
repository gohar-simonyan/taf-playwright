const UserDataHandler = require('../../data_handlers/user_data_handler');
const MockServer = require('../mock_server/mock_server');

describe('UserDataHandler.getUserEmailsList', () => {
    let userDataHandler;
    let mockServer;

    beforeEach(() => {
        userDataHandler = new UserDataHandler();
        mockServer = new MockServer();
    });

    it('Should return a semicolon-separated list of user emails when users array is populated', async () => {
         const mockUsers = [
            { email: 'user1@test.com' },
            { email: 'user2@test.com' },
            { email: 'user3@test.com' },
        ];
        mockServer.mockGet(200, mockUsers);
        await userDataHandler.loadUsers();
        const emailList = userDataHandler.getUserEmailsList();
        expect(emailList).toBe('user1@test.com;user2@test.com;user3@test.com');
    });

    it('Should throw an error if no users are loaded', async () => {
        mockServer.mockGet(200, []);
        await userDataHandler.loadUsers();
        expect(() => userDataHandler.getUserEmailsList()).toThrow('No users loaded!');
    });

    it('Should return a single email when there is only one user in the array', async () => {
        const mockUsers = [{ email: 'singleuser@test.com' }];
        mockServer.mockGet(200, mockUsers);
        await userDataHandler.loadUsers();
        const emailList = userDataHandler.getUserEmailsList();
        expect(emailList).toBe('singleuser@test.com');
    });

    it('Should handle users without an "email" property gracefully', async () => {
        const mockUsers = [
            { email: 'user1@test.com' },
            { name: 'User Without Email' },
            { email: 'user3@test.com' },
        ];
        mockServer.mockGet(200, mockUsers);
        await userDataHandler.loadUsers();
        const emailList = userDataHandler.getUserEmailsList();
        expect(emailList).toBe('user1@test.com;;user3@test.com');
    });

    it('Should include empty strings for users with empty email properties', async () => {
        const mockUsers = [
            { email: 'user1@test.com' },
            { email: '' },
            { email: 'user3@test.com' },
        ];
        mockServer.mockGet(200, mockUsers);
        await userDataHandler.loadUsers();
        const emailList = userDataHandler.getUserEmailsList();
        expect(emailList).toBe('user1@test.com;;user3@test.com');
    });
});
