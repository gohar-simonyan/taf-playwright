import { Page } from '@playwright/test';

export class DashboardPage {
    readonly page: Page;
    constructor(page: Page) {
        this.page = page;
    }

    get elements() {
        return {
            title: this.page.locator('[title="All Dashboards"]'),
        };
    }
}