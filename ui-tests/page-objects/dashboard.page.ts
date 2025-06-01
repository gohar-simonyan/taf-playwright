import { Page } from '@playwright/test';
import { PageObject } from '../types';
import { getParallelBaseUrl } from '../utils/urlHelper';

export class DashboardPage implements PageObject {

    readonly url: string = getParallelBaseUrl('dashboard');

    constructor(readonly page: Page) {}

    get title() {
        return this.page.getByTitle('All Dashboards');
    }

    async openPage() {
        await this.page.goto(`${this.url}`);
    }
}