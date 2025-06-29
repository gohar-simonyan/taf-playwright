const UserDataHandler = require('../../data_handlers/user_data_handler');
const filtered_user = require('../test_data/filtered_user')

describe('UserDataHandler.findUsers', () => {
    let userDataHandler;

    beforeEach(async () => {
        userDataHandler = new UserDataHandler();
        await userDataHandler.loadUsers();
    });

    it('Should throw an error if no search parameters are provided', () => {
        expect(() => userDataHandler.findUsers()).toThrow('No search parameters provoded!');
    });

    it('Should throw an error if no users are loaded', () => {
        userDataHandler.users = [];
        expect(() => userDataHandler.findUsers({ name: 'Alice' })).toThrow('No users loaded!');
    });

    it('Should throw an error if no matching users are found', () => {
        expect(() => userDataHandler.findUsers({ name: 'Test' })).toThrow('No matching users found!');
    });

    it('should return users that match all search parameters', () => {
        const result = userDataHandler.findUsers({ name: 'Leanne Graham' });
        expect(result).toEqual(filtered_user);
    });

    it('should not return users that partially match the search parameters', () => {
        expect(() => userDataHandler.findUsers({ name: 'Leanne Graham', email: 'test' })).toThrow(
            'No matching users found!'
        );
    });
});