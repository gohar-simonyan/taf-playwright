const UserDataHandler = require('../../data_handlers/user_data_handler');
const users = require('../test_data/users');

describe('LoadUsers functionality', () => {
    let userDataHandler;

    beforeEach(() => {
        userDataHandler = new UserDataHandler();
    });

    it('Should populate the users array with data from the server', async () => {
        await userDataHandler.loadUsers();
        expect(userDataHandler.users).toEqual(users);
        expect(userDataHandler.users.length).toBe(10);
    });

    it('Should set the users array to an empty array if the API response is empty', async () => {
        await userDataHandler.loadUsers();
        expect(userDataHandler.users).toEqual([]);
        expect(userDataHandler.users.length).toBe(0);
    });

    it('Should throw an error if the server is unreachable', async () => {
        await expect(userDataHandler.loadUsers()).rejects.toThrow('Failed to load users data:');
    });
});