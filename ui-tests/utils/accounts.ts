export function acquireAccount(id) {
    const username = process.env[`USER_NAME_${id}`];
    const password = process.env[`PASSWORD_${id}`];

    if (!username || !password) {
        throw new Error(`Credentials not found for account ID ${id}`);
    }

    return { username, password };
}