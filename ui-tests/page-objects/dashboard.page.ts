import { Page } from '@playwright/test';

export class DashboardPage {

    constructor(readonly page: Page) {}

    get elements() {
        return {
            title: this.page.getByTitle('All Dashboards'),
        };
    }
}