const UserDataHandler = require('../../data_handlers/user_data_handler');
const user_emails = require('../test_data/user_emails');

describe('getUserEmailsList functionality', () => {
    let userDataHandler;

    beforeEach(async () => {
        userDataHandler = new UserDataHandler();
        await userDataHandler.loadUsers();
    });

    it('Should return a semicolon-separated list of user emails when users array is populated', () => {
        const emailList = userDataHandler.getUserEmailsList();
        expect(emailList).toBe(user_emails);
    });

    it('Should throw an error if no users are loaded', () => {
        userDataHandler.users = [];
        expect(() => userDataHandler.getUserEmailsList()).toThrow('No users loaded!');
    });

    it('Should return a single email when there is only one user in the array', () => {
        const emailList = userDataHandler.getUserEmailsList();
        expect(emailList).toBe('singleuser@test.com');
    });

    it('should handle some users without an "email" property', () => {
        const emailList = userDataHandler.getUserEmailsList();
        expect(emailList).toBe('Sincere@april.biz;Lucio_Hettinger@annie.ca;Rey.Padberg@karina.biz');
    });

    it('Should include empty strings for users with empty email properties', () => {
        const emailList = userDataHandler.getUserEmailsList();
        expect(emailList).toBe('user1@test.com;;user3@test.com');
    });
});