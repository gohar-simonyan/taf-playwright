export class LoginPage{
    url = '#login';

    constructor(page) {
        this.page = page;
    }

    get loginInputField() {
        return this.page.getByPlaceholder( 'Login');
    }

    get passwordInputField() {
        return this.page.getByPlaceholder( 'Password');
    }

    get loginButton() {
        return this.page.getByRole('button', { name: 'Login', exact: true });
    }

    async openPage() {
        await this.page.goto(`${this.url}`);
    }

    async login(credentials) {
        await this.loginInputField.fill(credentials.username);
        await this.passwordInputField.fill(credentials.password);
        await this.loginButton.click();
    }
}