export default class LoginPage{

    get loginInputField() {
        return $('input[name="login"]');
    }

    get passwordInputField() {
        return $('input[name="password"]');
    }

    get loginButton() {
        return $('button[type="submit"]');
    }

    async openPage() {
        await browser.url('#login');
    }

    async login(credentials) {
        await this.loginInputField.setValue(credentials.username);
        await this.passwordInputField.setValue(credentials.password);
        await this.loginButton.click();
    }
}
