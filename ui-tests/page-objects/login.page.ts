import { Page } from '@playwright/test';
export class LoginPage {
    readonly url: string = '#login';

    constructor(readonly page: Page) {}

    get elements() {
        return {
            loginInputField: this.page.getByPlaceholder( 'Login'),
            passwordInputField: this.page.getByPlaceholder( 'Password'),
            loginButton: this.page.getByRole('button', { name: 'Login', exact: true }),
        };
    }

    async openPage() {
        await this.page.goto(`${process.env.BASE_URL}${this.url}`);
    }

    async login(credentials: { username: string; password: string }) {
        await this.elements.loginInputField.fill(credentials.username);
        await this.elements.passwordInputField.fill(credentials.password);
        await this.elements.loginButton.click();
    }
}