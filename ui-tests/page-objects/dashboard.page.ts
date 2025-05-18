import { Page } from '@playwright/test';

export class DashboardPage {

    constructor(readonly page: Page) {}

    get title() {
        return this.page.getByTitle('All Dashboards');
    }
}