import { Page } from '@playwright/test';
export class LaunchesPage {
    readonly url: string = 'launches/all';

    constructor(readonly page: Page, readonly test_id: number) {}

    get elements() {
        return {
            columnTitles: this.page.locator('.gridHeader__grid-header--KArbb>div'),
            launchItemNames: this.page.locator('.itemInfo__item-info--K7BYP:not([style]) > .itemInfo__main-info--uYMpQ'),
            launchItemCheckboxes: this.page.locator('.checkIcon__square--Exwkc'),
            hamburgerMenu: this.page.locator('.hamburger__hamburger--F5UVO'),
            deleteOption: this.page.getByText('Delete'),
            deleteSubmitButton: this.page.getByRole('button', { name: 'Delete' }),
            actionsButton: this.page.locator('.ghostMenuButton__ghost-menu-button--xMrXq'),
            compareOption: this.page.getByText('Compare'),
            diagram: this.page.locator('.c3-event-rect'),
        };
    }

    async openPage() {
        await this.page.goto(`${process.env.BASE_URL}${process.env[`BASE_USER_${this.test_id}`]}${this.url}`);
    }

    async reload() {
        await this.page.reload();
    }
}