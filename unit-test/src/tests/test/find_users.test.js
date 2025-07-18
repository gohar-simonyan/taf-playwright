const UserDataHandler = require('../../data_handlers/user_data_handler');
const MockServer = require('../mock_server/mock_server');

describe('UserDataHandler.findUsers', () => {
    let userDataHandler;
    let mockServer;

    const mockUsers = [
        { id: 1, name: 'Leanne Graham', email: 'leanne@example.com', age: 25 },
        { id: 2, name: 'Ervin Howell', email: 'ervin@example.com', age: 30 },
        { id: 3, name: 'Clementine Bauch', email: 'clementine@example.com', age: 28 },
    ];

    beforeEach(async () => {
        userDataHandler = new UserDataHandler();
        mockServer = new MockServer();
        mockServer.mockGet(200, mockUsers);
        await userDataHandler.loadUsers();
    });

    it('Should throw an error if no search parameters are provided', () => {
        expect(() => userDataHandler.findUsers())
            .toThrow('No search parameters provoded!');
    });

    it('Should throw an error if no users are loaded', async () => {
        mockServer.mockGet(200, []);
        await userDataHandler.loadUsers();
        const searchParams = { name: 'Leanne Graham' };
        expect(() => userDataHandler.findUsers(searchParams))
            .toThrow('No users loaded!');
    });

    it('Should throw an error if no matching users are found', () => {
        const searchParams = { name: 'Nonexistent User' }
        expect(() => userDataHandler.findUsers(searchParams))
            .toThrow('No matching users found!');
    });

    it('Should return users that match all search parameters', () => {
        const searchParams = { name: 'Leanne Graham' };
        const result = userDataHandler.findUsers(searchParams);
        expect(result).toEqual([
            { id: 1, name: 'Leanne Graham', email: 'leanne@example.com', age: 25 },
        ]);
    });

    it('Should not return users that partially match the search parameters', () => {
        const searchParams = { name: 'Leanne Graham', email: 'wrongemail@example.com' }
        expect(() =>
            userDataHandler.findUsers(searchParams))
            .toThrow('No matching users found!');
    });
});
