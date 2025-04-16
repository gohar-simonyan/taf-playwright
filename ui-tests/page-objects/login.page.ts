import { Page } from '@playwright/test';
export class LoginPage {
    readonly page: Page;
    readonly url: string = '#login';

    constructor(page: Page) {
        this.page = page;
    }

    get elements() {
        return {
            loginInputField: this.page.locator( '[placeholder="Login"]'),
            passwordInputField: this.page.locator( '[placeholder="Password"]'),
            loginButton: this.page.locator( '[class="loginForm__login-button-container--KT9g6"]>button'),
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