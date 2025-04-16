import { Page } from '@playwright/test';
export class LaunchesPage {
    readonly page: Page;
    readonly url: string = 'launches/all';

    constructor(page: Page) {
        this.page = page;
    }

    get elements() {
        return {
            tableHeader: this.page.locator('[class="gridHeader__grid-header--KArbb"]'),
            columnTitles: this.page.locator('[class="gridHeader__grid-header--KArbb"]>div')
        };
    }

    async openPage() {
        await this.page.goto(`${process.env.BASE_URL}${process.env.BASE_USER}${this.url}`);
    }
}