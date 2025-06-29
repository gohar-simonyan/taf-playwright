const axios = require('axios');
const UserDataHandler = require('../../data_handlers/user_data_handler');

jest.mock('axios');

describe('UserDataHandler.loadUsers', () => {
    let userDataHandler;

    beforeEach(() => {
        userDataHandler = new UserDataHandler();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('Should populate the users array with data when API call is successful', async () => {
        const mockResponse = { data: [{ email: 'user1@test.com' }, { email: 'user2@test.com' }] };
        axios.get.mockResolvedValueOnce(mockResponse);
        await userDataHandler.loadUsers();
        expect(axios.get).toHaveBeenCalledWith('http://localhost:3000/users');
        expect(axios.get).toHaveBeenCalledTimes(1);
        expect(userDataHandler.users).toEqual(mockResponse.data);
    });

    it('Should throw an error when the API call fails', async () => {
        axios.get.mockRejectedValueOnce(new Error('Server is down'));

        await expect(userDataHandler.loadUsers()).rejects.toThrow(
            'Failed to load users data: Error: Server is down'
        );
        expect(axios.get).toHaveBeenCalledWith('http://localhost:3000/users');
        expect(userDataHandler.users).toEqual([]);
    });

    it('Should set the users array to an empty array when the API response is empty', async () => {
        const mockResponse = { data: [] };
        axios.get.mockResolvedValueOnce(mockResponse);
        await userDataHandler.loadUsers();
        expect(axios.get).toHaveBeenCalledWith('http://localhost:3000/users');
        expect(userDataHandler.users).toEqual([]);
    });
});