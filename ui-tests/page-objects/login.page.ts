import { Page } from '@playwright/test';
import { PageObject } from '../types';

export class LoginPage implements PageObject {
    readonly url: string = '#login';

    constructor(readonly page: Page) {}

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

    async login(credentials: { username: string; password: string }) {
        await this.loginInputField.fill(credentials.username);
        await this.passwordInputField.fill(credentials.password);
        await this.loginButton.click();
    }
}