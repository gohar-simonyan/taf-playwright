const axios = require('axios');
const UserDataHandler = require('../../data_handlers/user_data_handler');

jest.mock('axios');

describe('UserDataHandler.findUsers (with mocks)', () => {
    let userDataHandler;

    const mockUsers = [
        { id: 1, name: 'Leanne Graham', email: 'leanne@example.com', age: 25 },
        { id: 2, name: 'Ervin Howell', email: 'ervin@example.com', age: 30 },
        { id: 3, name: 'Clementine Bauch', email: 'clementine@example.com', age: 28 },
    ];

    beforeEach(async () => {
        userDataHandler = new UserDataHandler();
        axios.get.mockResolvedValueOnce({ data: mockUsers });
        await userDataHandler.loadUsers();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('Should throw an error if no search parameters are provided', () => {
        expect(() => userDataHandler.findUsers()).toThrow('No search parameters provoded!');
    });

    it('Should throw an error if no users are loaded', () => {
        userDataHandler.users = [];
        expect(() => userDataHandler.findUsers({ name: 'Leanne Graham' })).toThrow('No users loaded!');
    });

    it('Should throw an error if no matching users are found', () => {
        expect(() => userDataHandler.findUsers({ name: 'Nonexistent User' })).toThrow(
            'No matching users found!'
        );
    });

    it('Should return users that match all search parameters', () => {
        const result = userDataHandler.findUsers({ name: 'Leanne Graham' });
        expect(result).toEqual([
            { id: 1, name: 'Leanne Graham', email: 'leanne@example.com', age: 25 },
        ]);
    });

    it('Should not return users that partially match the search parameters', () => {
        expect(() =>
            userDataHandler.findUsers({ name: 'Leanne Graham', email: 'wrongemail@example.com' })
        ).toThrow('No matching users found!');
    });
});