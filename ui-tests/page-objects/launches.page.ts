import { Page } from '@playwright/test';
export class LaunchesPage {
    readonly url: string = 'launches/all';

    constructor(readonly page: Page) {}

    get elements() {
        return {
            columnTitles: this.page.locator('.gridHeader__grid-header--KArbb>div')
        };
    }

    async openPage() {
        await this.page.goto(`${process.env.BASE_URL}${process.env.BASE_USER}${this.url}`);
    }
}