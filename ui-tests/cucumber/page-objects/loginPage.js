export default class LoginPage {

    constructor(elementFactory) {
        this.elementFactory = elementFactory;
        this.url = '#login';
    }

    get loginInputField() {
        return this.elementFactory.getByPlaceholder('Login');
    }

    get passwordInputField() {
        return this.elementFactory.getByPlaceholder('Password');
    }

    get loginButton() {
        return this.elementFactory.bySelector('button[type="submit"]');
    }

    async openPage() {
        if (this.elementFactory.page) {
            await this.elementFactory.page.goto(`${this.url}`);
        } else if (this.elementFactory.browser) {
            await this.elementFactory.browser.url(`${this.url}`);
        }
    }

    async login(credentials) {
        if (this.elementFactory.page) {
            await this.loginInputField.fill(credentials.username);
            await this.passwordInputField.fill(credentials.password);
        } else if (this.elementFactory.browser) {
            await this.loginInputField.setValue(credentials.username);
            await this.passwordInputField.setValue(credentials.password);
        }
        await this.loginButton.click();
    }
}
