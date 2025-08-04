export class ElementFactory {
    constructor({ page, browser }) {
        this.page = page;
        this.browser = browser;
    }

    byRole(role, options) {
        if (this.page) {
            return this.page.getByRole(role, options);
        }
        // if (this.browser) {
        //     const { name } = options || {};
        //     const selector = name
        //         ? `//*[@role="${role}" and text()="${name}"]`
        //         : `[role="${role}"]`;
        //     return this.browser.$(selector);
        // }
        if (this.browser) {
            const { name } = options || {};
            const selector = name
                ? `//*[@type="${role}" and text()="${name}"]`
                : `[type="${role}"]`;
            return this.browser.$(selector);
        }
    }

    getByPlaceholder(placeholder) {
        if (this.page) {
            return this.page.getByPlaceholder(placeholder);
        }
        if (this.browser) {
            return this.browser.$(`input[placeholder="${placeholder}"]`);
        }
    }

    bySelector(selector) {
        if (this.page) {
            return this.page.locator(selector);
        }
        if (this.browser) {
            return this.browser.$(selector);
        }
    }

    allBySelector(selector) {
        if (this.page) {
            return this.page.locator(selector);
        }
        if (this.browser) {
            return this.browser.$$(selector);
        }
    }

    async navigateTo(url) {
        if (this.page) {
            await this.page.goto(url);
        }

        if (this.browser) {
            await this.browser.url(url);
        }
    }

    async reloadPage() {
        if (this.page) {
            await this.page.reload();
        }

        if (this.browser) {
            await this.browser.refresh();
        }
    }
}
